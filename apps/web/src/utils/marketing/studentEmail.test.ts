import { isValidStudentEmail } from './studentEmail';

describe('isValidStudentEmail', () => {
  test('valid .edu emails', () => {
    expect(isValidStudentEmail('john.doe@u.nus.edu')).toEqual({ valid: true });
    expect(isValidStudentEmail('john.doe@hawk.iit.edu')).toEqual({
      valid: true,
    });
    expect(isValidStudentEmail('john.doe@ci.suez.edu.eg')).toEqual({
      valid: true,
    });
    expect(isValidStudentEmail('john.doe@g.ucla.edu')).toEqual({
      valid: true,
    });
    expect(isValidStudentEmail('john.doe@ufl.edu')).toEqual({
      valid: true,
    });
  });

  describe('invalid emails', () => {
    test('invalid emails', () => {
      expect(isValidStudentEmail('john.doe@')).toEqual({
        reason: 'Invalid email',
        valid: false,
      });

      expect(isValidStudentEmail('jane.smith')).toEqual({
        reason: 'Invalid email',
        valid: false,
      });

      expect(isValidStudentEmail('info')).toEqual({
        reason: 'Invalid email',
        valid: false,
      });
    });

    test('alumni emails', () => {
      expect(isValidStudentEmail('john.doe@alumn.mit.edu')).toEqual({
        reason: 'Alumni emails are not eligible',
        valid: false,
      });

      expect(isValidStudentEmail('john.doe@alumni.princeton.edu')).toEqual({
        reason: 'Alumni emails are not eligible',
        valid: false,
      });
    });

    test("doesn't contain .edu", () => {
      expect(isValidStudentEmail('john.doe@example.com')).toEqual({
        reason:
          'Email does not contain a .edu, only accredited educational institutions are eligible',
        valid: false,
      });

      expect(isValidStudentEmail('john.edu@example.com')).toEqual({
        reason:
          'Email does not contain a .edu, only accredited educational institutions are eligible',
        valid: false,
      });

      expect(isValidStudentEmail('jane.smith@student.org')).toEqual({
        reason:
          'Email does not contain a .edu, only accredited educational institutions are eligible',
        valid: false,
      });

      expect(isValidStudentEmail('info@university.com')).toEqual({
        reason:
          'Email does not contain a .edu, only accredited educational institutions are eligible',
        valid: false,
      });

      expect(isValidStudentEmail('jane.smith@gmail.com')).toEqual({
        reason:
          'Email does not contain a .edu, only accredited educational institutions are eligible',
        valid: false,
      });

      expect(isValidStudentEmail('john.doe.example.edu')).toEqual({
        reason: 'Invalid email',
        valid: false,
      });

      expect(isValidStudentEmail('info@university.com')).toEqual({
        reason:
          'Email does not contain a .edu, only accredited educational institutions are eligible',
        valid: false,
      });
    });
  });
});
