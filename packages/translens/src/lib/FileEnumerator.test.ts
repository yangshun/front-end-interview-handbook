import { describe, it, expect, vi } from 'vitest';
import FileEnumerator from './FileEnumerator'; // Adjust the import path

describe('FileEnumerator', () => {
  it('should enumerate files excluding target and ignore files', async () => {
    // Mocking glob.sync to return specific file paths
    const mockGlobSync = vi.fn((pattern: string) => {
      if (pattern === 'src/**/*.js') {
        return ['src/file1.js', 'src/file2.js', 'src/file3.js']; // Source files
      }
      if (pattern === 'target/**/*.js' || pattern === 'ignore/*.js') {
        return ['src/file2.js']; // Excluded file
      }
      return [];
    });

    // Create instance of FileEnumerator with mocked glob.sync
    const enumerator = new FileEnumerator(
      'src/**/*.js', // sourcefilePath
      ['target/**/*.js'], // targetFilePaths
      ['ignore/*.js'], // ignoreFiles
      mockGlobSync, // Inject mocked function
    );

    // Run the enumeration
    const result = await enumerator.enumerateFiles();

    // Assert that 'src/file2.js' is excluded and the other files remain
    expect(result).toEqual(['src/file1.js', 'src/file3.js']);

    // Verify glob.sync was called with the expected patterns
    expect(mockGlobSync).toHaveBeenCalledWith('src/**/*.js');
    expect(mockGlobSync).toHaveBeenCalledWith('target/**/*.js');
    expect(mockGlobSync).toHaveBeenCalledWith('ignore/*.js');
  });

  it('should handle empty exclude arrays', async () => {
    // Mocking glob.sync to return source files
    const mockGlobSync = vi.fn((pattern: string) => {
      if (pattern === 'src/**/*.js') {
        return ['src/file1.js', 'src/file2.js', 'src/file3.js'];
      }
      return [];
    });

    // Create instance with no target or ignore files
    const enumerator = new FileEnumerator(
      'src/**/*.js', // sourcefilePath
      [], // targetFilePaths
      [], // ignoreFiles
      mockGlobSync, // Inject mocked function
    );

    // Run the enumeration
    const result = await enumerator.enumerateFiles();

    // Assert that all files are included since no exclusion is specified
    expect(result).toEqual(['src/file1.js', 'src/file2.js', 'src/file3.js']);
  });
});
