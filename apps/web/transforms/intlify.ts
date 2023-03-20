// eslint-disable
const bannedAttributes = ['className', 'variant', 'aria-hidden', 'role'];

function isTranslatableString(text) {
  // Empty string.
  if (text.length === 0) {
    return false;
  }

  // String starts with lower case, likely not translatable.
  if (!/[A-Z]/.test(text[0])) {
    return false;
  }

  return true;
}

function isPartOfObjectMethod(node, objectName, methodName) {
  if (!ts.isPropertyAssignment(node.parent)) {
    return false;
  }

  if (!ts.isObjectLiteralExpression(node.parent?.parent)) {
    return false;
  }

  const callExpressionNode = node.parent?.parent?.parent;
  if (!ts.isCallExpression(callExpressionNode)) {
    return false;
  }

  return (
    callExpressionNode.expression.name.escapedText === methodName &&
    callExpressionNode.expression.expression.escapedText === objectName
  );
}

function isPartOfFormatMethodComponent(node) {
  if (!ts.isJsxAttribute(node.parent)) {
    return false;
  }

  if (!ts.isJsxAttributes(node.parent?.parent)) {
    return false;
  }

  const selfClosingElement = node.parent?.parent?.parent;
  if (!ts.isJsxSelfClosingElement(selfClosingElement)) {
    return false;
  }

  return selfClosingElement.tagName.escapedText === 'FormattedMessage';
}

function isWithinIntlFormatMessageCall(node) {
  return isPartOfObjectMethod(node, 'intl', 'formatMessage');
}

function isWithinGtagEventCall(node) {
  return isPartOfObjectMethod(node, 'gtag', 'event');
}

function isPropValueTranslatable(node) {
  if (!ts.isStringLiteral(node)) {
    return false;
  }

  // Not a JSX attribute.
  if (!ts.isJsxAttribute(node.parent)) {
    return false;
  }

  // These attributes can be excluded as the values are likely not for translation.
  if (bannedAttributes.includes(node.parent.name.escapedText)) {
    return false;
  }

  return isTranslatableString(node.text);
}

function isLoneJsxText(node) {
  if (!ts.isJsxText(node)) {
    return false;
  }

  // Has siblings.
  if (node.parent?.children?.length > 1) {
    return false;
  }

  // Empty element.
  if (node.containsOnlyTriviaWhiteSpaces) {
    return false;
  }

  if (node.parent?.parent?.children?.length > 1) {
    for (const uncle of node.parent.parent.children) {
      // If any uncles are JsxText we ignore since they
      // likely need to be interpolated among grandparents.
      if (ts.isJsxText(uncle) && !uncle.containsOnlyTriviaWhiteSpaces) {
        return false;
      }
    }
  }

  return true;
}

function isWithinFunctionDeclaration(node) {
  let parent = node.parent;
  while (parent != null) {
    if (ts.isFunctionDeclaration(parent)) {
      return true;
    }
    parent = parent.parent;
  }

  return false;
}

function isObjectValue(node) {
  if (!ts.isPropertyAssignment(node.parent)) {
    return false;
  }

  if (!ts.isObjectLiteralExpression(node.parent.parent)) {
    return false;
  }

  return node.parent.initializer === node;
}

function createIntlFormatMessageExpression(factory, text) {
  return factory.createCallExpression(
    factory.createPropertyAccessExpression(
      factory.createIdentifier('intl'),
      factory.createIdentifier('formatMessage'),
    ),
    undefined,
    [
      factory.createObjectLiteralExpression([
        factory.createPropertyAssignment(
          factory.createIdentifier('defaultMessage'),
          factory.createStringLiteral(text),
        ),
        factory.createPropertyAssignment(
          factory.createIdentifier('description'),
          factory.createStringLiteral('TODO_i18n_REPLACE_ME'),
        ),
      ]),
    ],
  );
}

function findReactIntlImportDeclaration(sourceFile) {
  for (const statement of sourceFile.statements) {
    if (!ts.isImportDeclaration(statement)) {
      continue;
    }
    if (statement.moduleSpecifier?.text === 'react-intl') {
      return statement;
    }
  }

  return null;
}

function findNamedImport(importDeclaration, name) {
  for (const importSpecifier of importDeclaration.importClause.namedBindings
    .elements) {
    if (importSpecifier?.name?.escapedText === name) {
      return true;
    }
  }

  return false;
}

export default function intlify() {
  return (context: TransformationContext) => {
    return (sourceFile: SourceFile) => {
      let importFormattedMessage = false;
      let importUseIntl = false;

      const factory = context.factory;
      const visitor: Visitor = (node) => {
        if (
          ts.isStringLiteral(node) &&
          isObjectValue(node) &&
          isWithinFunctionDeclaration(node) &&
          isTranslatableString(node.text) &&
          !isWithinIntlFormatMessageCall(node) &&
          !isWithinGtagEventCall(node)
        ) {
          importUseIntl = true;
          return createIntlFormatMessageExpression(factory, node.text);
        }

        if (
          isPropValueTranslatable(node) &&
          !isPartOfFormatMethodComponent(node)
        ) {
          importUseIntl = true;

          return factory.createJsxExpression(
            undefined,
            createIntlFormatMessageExpression(factory, node.text),
          );
        }

        if (isLoneJsxText(node)) {
          const stringValue = node.text.replace(/\s+/g, ' ').trim();
          if (stringValue.length === 0) {
            return node;
          }

          importFormattedMessage = true;

          return factory.createJsxSelfClosingElement(
            factory.createIdentifier('FormattedMessage'),
            undefined,
            factory.createJsxAttributes([
              factory.createJsxAttribute(
                factory.createIdentifier('defaultMessage'),
                factory.createStringLiteral(stringValue),
              ),
              factory.createJsxAttribute(
                factory.createIdentifier('description'),
                factory.createStringLiteral('TODO_i18n_REPLACE_ME'),
              ),
            ]),
          );
        }

        return ts.visitEachChild(node, visitor, context);
      };

      const newSrcFile = ts.visitNode(sourceFile, visitor);
      // No new imports needed.
      if (!importFormattedMessage && !importUseIntl) {
        return newSrcFile;
      }

      // Find any existing import declaration and what names they're using.
      const importDeclaration = findReactIntlImportDeclaration(newSrcFile);
      if (importDeclaration != null) {
        // Remove import declaration and re-add it back.
        newSrcFile.statements = newSrcFile.statements.filter(
          (statement) => statement !== importDeclaration,
        );

        importFormattedMessage =
          importFormattedMessage ||
          findNamedImport(importDeclaration, 'FormattedMessage');
        importUseIntl =
          importFormattedMessage ||
          findNamedImport(importDeclaration, 'useIntl');
      }

      // Recreate the import declaration with the final named imports.
      return ts.updateSourceFileNode(newSrcFile, [
        factory.createImportDeclaration(
          /* decorators */ undefined,
          /* modifiers */ undefined,
          factory.createImportClause(
            false,
            undefined,
            factory.createNamedImports(
              [
                importFormattedMessage &&
                  factory.createImportSpecifier(
                    false,
                    undefined,
                    factory.createIdentifier('FormattedMessage'),
                  ),
                importUseIntl &&
                  factory.createImportSpecifier(
                    false,
                    undefined,
                    factory.createIdentifier('useIntl'),
                  ),
              ].filter(Boolean),
            ),
          ),
          factory.createStringLiteral('react-intl'),
        ),
        ...newSrcFile.statements,
      ]);
    };
  };
}
