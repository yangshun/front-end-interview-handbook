import type { API, FileInfo } from 'jscodeshift';

const intlDescription = 'TODO_i18n_REPLACE_ME';

export default function transform(file: FileInfo, api: API) {
  const j = api.jscodeshift;
  const root = j(file.source);
  let hasModifications = false;
  let importFormattedMessage = false;
  let needUseClientImport = false;
  const variablesToTransform: Array<any> = [];

  function isTranslatableString(text: string): boolean {
    if (text.length === 0) {
      return false;
    }

    if (!/[A-Z]/.test(text[0])) {
      return false;
    }

    // Skip if the string is all uppercase
    // Might be a constant
    if (text === text.toUpperCase()) {
      return false;
    }

    return true;
  }

  function isObjectValue(node): boolean {
    if (node.parentPath.value.type !== 'ObjectProperty') {
      return false;
    }

    if (
      node.parentPath.parentPath.parentPath.value.type !== 'ObjectExpression'
    ) {
      return false;
    }

    return node.parentPath.value.value === node.value;
  }

  function isReactComponentOrHook(node): boolean {
    let parent = node.parentPath;

    while (parent) {
      if (
        parent.value.type === 'FunctionDeclaration' ||
        parent.value.type === 'ArrowFunctionExpression'
      ) {
        // Check if the function is a React component
        if (isReactComponent(parent)) {
          return true;
        }

        // Check if the function is a React hook
        if (isReactHook(parent)) {
          return true;
        }
      }

      parent = parent.parentPath;
    }

    return false;
  }

  function isInsideComponent(path) {
    let parent = path.parentPath;

    while (parent) {
      if (
        parent.value.type === 'FunctionDeclaration' ||
        parent.value.type === 'ArrowFunctionExpression' ||
        parent.value.type === 'ClassMethod'
      ) {
        if (isReactComponent(parent)) {
          return true;
        }
      }
      parent = parent.parentPath;
    }

    return false;
  }

  function isReactComponent(node): boolean {
    const { body } = node.value;

    // Check for BlockStatement with JSX return
    if (body.type === 'BlockStatement') {
      const returnStatements = j(body).find(j.ReturnStatement);

      return returnStatements.some((rs) => j(rs).find(j.JSXElement).size() > 0);
    }

    // Handle arrow functions with JSX directly
    return j(body).find(j.JSXElement).size() > 0;
  }

  function isReactHook(node): boolean {
    // Check if the function name starts with "use" (convention for React hooks)
    if (
      node.value.id &&
      node.value.id.type === 'Identifier' &&
      node.value.id.name.startsWith('use')
    ) {
      return true;
    }

    // Check if the function calls other hooks
    if (node.value.body.type === 'BlockStatement') {
      const hookCalls = j(node.value.body).find(j.CallExpression, {
        callee: {
          name: (name: string) => name.startsWith('use'),
          type: 'Identifier',
        },
      });

      if (hookCalls.size() > 0) {
        return true;
      }
    }

    return false;
  }

  function isPartOfObjectMethod(
    node,
    objectName: string,
    methodName: string,
  ): boolean {
    if (node.parentPath.value.type !== 'ObjectProperty') {
      return false;
    }

    if (
      node.parentPath.parentPath.parentPath.value.type !== 'ObjectExpression'
    ) {
      return false;
    }

    const callExpressionNode =
      node.parentPath.parentPath.parentPath.parentPath.parentPath.value;

    if (callExpressionNode.type !== 'CallExpression') {
      return false;
    }

    return (
      callExpressionNode.callee.property?.name === methodName &&
      callExpressionNode.callee.object?.name === objectName
    );
  }

  function findReactIntlImportDeclaration(node) {
    return node.find(j.ImportDeclaration, {
      source: { value: '~/components/intl' },
    });
  }

  function findNamedImport(importDeclaration, name: string): boolean {
    return (
      importDeclaration
        .find(j.ImportSpecifier, {
          imported: { name },
        })
        .size() > 0
    );
  }

  function isWithinIntlFormatMessageCall(node): boolean {
    return isPartOfObjectMethod(node, 'intl', 'formatMessage');
  }
  function isWithinFormattedMessage(node): boolean {
    let parent = node.parentPath;

    while (parent) {
      if (
        parent.value.type === 'JSXElement' &&
        parent.value.openingElement &&
        parent.value.openingElement.name &&
        parent.value.openingElement.name.name === 'FormattedMessage'
      ) {
        return true;
      }

      // Also check if it's part of a FormattedMessage prop
      if (
        parent.value.type === 'JSXAttribute' &&
        parent.parentPath &&
        parent.parentPath.value.type === 'JSXOpeningElement' &&
        parent.parentPath.value.name &&
        parent.parentPath.value.name.name === 'FormattedMessage'
      ) {
        return true;
      }

      parent = parent.parentPath;
    }

    return false;
  }

  function isWithinGtagEventCall(node) {
    return isPartOfObjectMethod(node, 'gtag', 'event');
  }

  function isWithinFunctionCall(node, functionName: string): boolean {
    let parent = node.parentPath;

    while (parent) {
      // Check if the parent is a CallExpression and the callee matches the function name
      if (
        parent.value.type === 'CallExpression' &&
        parent.value.callee.type === 'Identifier' &&
        parent.value.callee.name === functionName
      ) {
        return true;
      }

      parent = parent.parentPath;
    }

    return false;
  }

  // Helper to create intl.formatMessage call
  const createIntlFormatMessageExpression = (
    text: string,
    description: string,
  ) => {
    return j.callExpression(
      j.memberExpression(j.identifier('intl'), j.identifier('formatMessage')),
      [
        j.objectExpression([
          j.property(
            'init',
            j.identifier('defaultMessage'),
            j.stringLiteral(text),
          ),
          j.property(
            'init',
            j.identifier('description'),
            j.stringLiteral(description),
          ),
        ]),
      ],
    );
  };

  // Function to generate a unique hook name
  function generateHookName(originalName: string): string {
    // Ensure the name starts with 'use' and is camelCased
    const baseName = originalName.replace(/^[a-z]/, (char) =>
      char.toUpperCase(),
    );

    return `use${baseName}`;
  }

  // Function to check if a collection has translatable strings
  function hasTranslatableStrings(node): boolean {
    // Check for array of objects
    if (node.type === 'ArrayExpression') {
      return node.elements.some(
        (elem) =>
          elem.type === 'ObjectExpression' &&
          elem.properties.some(
            (prop) =>
              prop.type === 'ObjectProperty' &&
              prop.value.type === 'StringLiteral' &&
              isTranslatableString(prop.value.value),
          ),
      );
    }

    // Check for object
    if (node.type === 'ObjectExpression') {
      return node.properties.some(
        (prop) =>
          prop.type === 'ObjectProperty' &&
          prop.value.type === 'StringLiteral' &&
          isTranslatableString(prop.value.value),
      );
    }

    return false;
  }

  // Function to find components using a specific variable
  function findComponentsUsingVariable(rootNode, variableName: string) {
    return rootNode.find(j.FunctionDeclaration).filter((componentPath) => {
      return j(componentPath)
        .find(j.Identifier, { name: variableName })
        .some((path) => {
          // Check if the identifier is used in a context that suggests component usage
          const { parentPath } = path;

          return (
            parentPath.value.type === 'MemberExpression' ||
            parentPath.value.type === 'CallExpression'
          );
        });
    });
  }

  // 1. Transform JSXText nodes only if the string is capitalized
  root.find(j.JSXText).forEach((path) => {
    const text = path.value.value.replace(/\s+/g, ' ').trim();

    if (text.length === 0 || !isInsideComponent(path)) {
      return;
    }

    // Only transform if the text is considered translatable.
    // For instance, skip if it doesn’t start with an uppercase letter.
    if (!isTranslatableString(text)) {
      return;
    }

    j(path).replaceWith(
      j.jsxExpressionContainer(
        createIntlFormatMessageExpression(text, intlDescription),
      ),
    );
    hasModifications = true;
  });

  // 2. Object `StringLiteral` values used within React components/hooks.
  root.find(j.Literal).forEach((path) => {
    if (
      typeof path.value.value === 'string' &&
      isObjectValue(path) &&
      isReactComponentOrHook(path) &&
      isTranslatableString(path.value.value) &&
      !isWithinFormattedMessage(path) &&
      !isWithinIntlFormatMessageCall(path) &&
      !isWithinFunctionCall(path, 'logEvent') &&
      !isWithinFunctionCall(path, 'logMessage') &&
      !isWithinGtagEventCall(path)
    ) {
      j(path).replaceWith(
        createIntlFormatMessageExpression(path.value.value, intlDescription),
      );
      hasModifications = true;
    }
  });

  // 3. Transform JSXAttribute string literals
  root.find(j.JSXAttribute).forEach((path) => {
    if (
      path.node.name.type === 'JSXIdentifier' &&
      path.node.value?.type === 'StringLiteral' &&
      isTranslatableString(path.node.value.value) &&
      isInsideComponent(path) &&
      !isWithinIntlFormatMessageCall(path) &&
      !isWithinFormattedMessage(path)
    ) {
      const attributeName = path.node.name.name;

      j(path).replaceWith(
        j.jsxAttribute(
          j.jsxIdentifier(attributeName),
          j.jsxExpressionContainer(
            createIntlFormatMessageExpression(
              path.node.value.value,
              intlDescription,
            ),
          ),
        ),
      );
      hasModifications = true;
    }
  });

  // 4.  Transform array/object variable declare outside react component to be hook
  root.find(j.VariableDeclaration).forEach((path) => {
    path.node.declarations.forEach((declarator) => {
      if (declarator.type !== 'VariableDeclarator') {
        return;
      }

      if (
        declarator.init &&
        hasTranslatableStrings(declarator.init) &&
        declarator.id.type === 'Identifier'
      ) {
        const variableName = declarator.id.name;
        const componentsUsingVariable = findComponentsUsingVariable(
          root,
          variableName,
        );

        if (componentsUsingVariable.size() > 0) {
          variablesToTransform.push({
            collection: declarator.init,
            componentsUsingVariable,
            path,
            variableName,
          });
        }
      }
    });
  });

  // Transform collected variables
  variablesToTransform.forEach(
    ({ variableName, collection, path, componentsUsingVariable }) => {
      const hookName = generateHookName(variableName);

      // Create hook declaration outside any component
      const hookDeclaration = j.functionDeclaration(
        j.identifier(hookName),
        [],
        j.blockStatement([
          j.variableDeclaration('const', [
            j.variableDeclarator(
              j.identifier('intl'),
              j.callExpression(j.identifier('useIntl'), []),
            ),
          ]),
          j.returnStatement(
            collection.type === 'ArrayExpression'
              ? j.arrayExpression(
                  collection.elements.map((elem) => {
                    if (elem.type === 'ObjectExpression') {
                      return j.objectExpression(
                        elem.properties.map((prop) => {
                          if (
                            prop.value.type === 'StringLiteral' &&
                            isTranslatableString(prop.value.value)
                          ) {
                            return j.objectProperty(
                              prop.key,
                              createIntlFormatMessageExpression(
                                prop.value.value,
                                intlDescription,
                              ),
                            );
                          }

                          return prop;
                        }),
                      );
                    }

                    return elem;
                  }),
                )
              : j.objectExpression(
                  collection.properties.map((prop) => {
                    if (
                      prop.value.type === 'StringLiteral' &&
                      isTranslatableString(prop.value.value)
                    ) {
                      return j.objectProperty(
                        prop.key,
                        createIntlFormatMessageExpression(
                          prop.value.value,
                          intlDescription,
                        ),
                      );
                    }

                    return prop;
                  }),
                ),
          ),
        ]),
      );

      // Remove the original variable declaration
      j(path).remove();

      // Modify components using the variable
      componentsUsingVariable.forEach((componentPath) => {
        // Add a variable declaration inside the component using the hook
        const hookCallExpression = j.callExpression(j.identifier(hookName), []);

        const variableDeclaration = j.variableDeclaration('const', [
          j.variableDeclarator(j.identifier(variableName), hookCallExpression),
        ]);

        // Insert the variable declaration at the beginning of the component's body
        componentPath.node.body.body.unshift(variableDeclaration);
      });

      // Add the hook declaration to the program body
      root.get().node.program.body.push(hookDeclaration);

      hasModifications = true;
    },
  );

  // Add necessary imports if transformations were made
  if (hasModifications) {
    // Add useIntl and FormattedMessage import
    const importDeclaration = findReactIntlImportDeclaration(root);
    const hasIntlImportAlready = importDeclaration.size() > 0;

    if (hasIntlImportAlready) {
      importDeclaration.forEach((path) => {
        importFormattedMessage =
          importFormattedMessage ||
          findNamedImport(j(path), 'FormattedMessage');
        hasModifications =
          importFormattedMessage || findNamedImport(j(path), 'useIntl');
      });

      importDeclaration.remove();
    } else {
      // Need to import "use client" if the file doesn't already have intl import
      const firstNode = root.get().node.program.body[0];
      if (
        firstNode.type !== 'ExpressionStatement' ||
        firstNode.expression.value !== 'use client'
      ) {
        needUseClientImport = true;
      }
    }

    const newImport = j.importDeclaration(
      [
        ...(importFormattedMessage
          ? [j.importSpecifier(j.identifier('FormattedMessage'))]
          : []),
        hasModifications && j.importSpecifier(j.identifier('useIntl')),
      ].filter(Boolean),
      j.literal('~/components/intl'),
    );

    root.get().node.program.body.unshift(newImport);
    if (needUseClientImport) {
      root
        .get()
        .node.program.body.unshift(
          j.expressionStatement(j.stringLiteral('use client')),
        );
    }

    // Add intl declaration in components that need it
    root.find(j.FunctionDeclaration).forEach((path) => {
      const { body } = path.node.body;

      // Check if the function uses intl.formatMessage
      const usesIntlFormatMessage =
        j(path)
          .find(j.CallExpression, {
            callee: {
              object: { name: 'intl', type: 'Identifier' },
              property: { name: 'formatMessage', type: 'Identifier' },
              type: 'MemberExpression',
            },
          })
          .size() > 0;

      // Skip if the function doesn't use intl.formatMessage
      if (!usesIntlFormatMessage) {
        return;
      }

      // Check if the parent function already has the intl declaration
      let parentHasIntlDeclaration = false;
      let { parentPath } = path;

      while (parentPath) {
        if (
          parentPath.value.type === 'FunctionDeclaration' ||
          parentPath.value.type === 'ArrowFunctionExpression'
        ) {
          const parentBody = parentPath.value.body.body;

          if (
            parentBody.some(
              (node) =>
                j.VariableDeclaration.check(node) &&
                node.declarations.some(
                  (d) =>
                    j.VariableDeclarator.check(d) &&
                    j.Identifier.check(d.id) &&
                    d.id.name === 'intl',
                ),
            )
          ) {
            parentHasIntlDeclaration = true;
            break;
          }
        }

        // eslint-disable-next-line prefer-destructuring
        parentPath = parentPath.parentPath;
      }

      // Skip if the parent function already has the intl declaration
      if (parentHasIntlDeclaration) {
        return;
      }

      // Add the intl declaration if it doesn't already exist
      if (
        !body.some(
          (node) =>
            j.VariableDeclaration.check(node) &&
            node.declarations.some(
              (d) =>
                j.VariableDeclarator.check(d) &&
                j.Identifier.check(d.id) &&
                d.id.name === 'intl',
            ),
        )
      ) {
        body.unshift(
          j.variableDeclaration('const', [
            j.variableDeclarator(
              j.identifier('intl'),
              j.callExpression(j.identifier('useIntl'), []),
            ),
          ]),
        );
      }
    });
  }

  return hasModifications ? root.toSource() : null;
}
