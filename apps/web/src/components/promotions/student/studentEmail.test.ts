import { isValidStudentEmail } from './studentEmail';

describe('isValidStudentEmail', () => {
  describe('valid .edu emails', () => {
    test('.edu suffix', () => {
      expect(isValidStudentEmail('john.doe@u.nus.edu')).toEqual({
        valid: true,
      });
      expect(isValidStudentEmail('john.doe@hawk.iit.edu')).toEqual({
        valid: true,
      });
      expect(isValidStudentEmail('john.doe@g.ucla.edu')).toEqual({
        valid: true,
      });
      expect(isValidStudentEmail('john.doe@ufl.edu')).toEqual({
        valid: true,
      });
    });

    test('.edu in the middle', () => {
      expect(isValidStudentEmail('john.doe@ci.suez.edu.eg')).toEqual({
        valid: true,
      });
      expect(
        isValidStudentEmail('aabhishekbtech20@ced.alliance.edu.in'),
      ).toEqual({
        valid: true,
      });
    });

    test('.edu prefix', () => {
      expect(isValidStudentEmail('abdi.bala@edu.uwaterloo.ca')).toEqual({
        valid: true,
      });
    });
  });

  describe('.ac emails', () => {
    test('.ac.in substrings', () => {
      expect(isValidStudentEmail('sahil.khan@iiitg.ac.in')).toEqual({
        valid: true,
      });
      expect(isValidStudentEmail('prathamesh.redij@spit.ac.in')).toEqual({
        valid: true,
      });
      expect(isValidStudentEmail('nishtha.kumari@nift.ac.in')).toEqual({
        valid: true,
      });
      expect(
        isValidStudentEmail('fitri.anjaini3279@student.unri.ac.id'),
      ).toEqual({
        valid: true,
      });
    });

    test('.ac suffixes', () => {
      expect(isValidStudentEmail('sahil.khan@iiitg.ac')).toEqual({
        valid: true,
      });
      expect(isValidStudentEmail('prathamesh.redij@spit.ac')).toEqual({
        valid: true,
      });
      expect(isValidStudentEmail('nishtha.kumari@nift.ac')).toEqual({
        valid: true,
      });
    });
  });

  test('.ca suffixes', () => {
    expect(isValidStudentEmail('greg@humbermail.ca')).toEqual({
      valid: true,
    });
    expect(isValidStudentEmail('chen@utoronto.ca')).toEqual({
      valid: true,
    });
    expect(isValidStudentEmail('ksaraf@student.ubc.ca')).toEqual({
      valid: true,
    });
  });

  describe('invalid emails', () => {
    test('invalid emails', () => {
      expect(isValidStudentEmail('john.doe@')).toEqual({
        reason: 'Invalid email address.',
        valid: false,
      });

      expect(isValidStudentEmail('jane.smith')).toEqual({
        reason: 'Invalid email address.',
        valid: false,
      });

      expect(isValidStudentEmail('info')).toEqual({
        reason: 'Invalid email address.',
        valid: false,
      });
    });

    test('alumni emails', () => {
      expect(isValidStudentEmail('john.doe@alumn.mit.edu')).toEqual({
        reason: 'Alumni email addresses are not eligible.',
        valid: false,
      });

      expect(isValidStudentEmail('john.doe@alumni.princeton.edu')).toEqual({
        reason: 'Alumni email addresses are not eligible.',
        valid: false,
      });
    });

    test("doesn't contain .edu", () => {
      expect(isValidStudentEmail('john.doe@example.com')).toEqual({
        reason:
          'Email address does not seem to belong to an accredited educational institution. Send us an email if you believe your school should qualify.',
        valid: false,
      });

      expect(isValidStudentEmail('john.edu@example.com')).toEqual({
        reason:
          'Email address does not seem to belong to an accredited educational institution. Send us an email if you believe your school should qualify.',
        valid: false,
      });

      expect(isValidStudentEmail('jane.smith@student.org')).toEqual({
        reason:
          'Email address does not seem to belong to an accredited educational institution. Send us an email if you believe your school should qualify.',
        valid: false,
      });

      expect(isValidStudentEmail('info@university.com')).toEqual({
        reason:
          'Email address does not seem to belong to an accredited educational institution. Send us an email if you believe your school should qualify.',
        valid: false,
      });

      expect(isValidStudentEmail('jane.smith@gmail.com')).toEqual({
        reason:
          'Email address does not seem to belong to an accredited educational institution. Send us an email if you believe your school should qualify.',
        valid: false,
      });

      expect(isValidStudentEmail('john.doe.example.edu')).toEqual({
        reason: 'Invalid email address.',
        valid: false,
      });

      expect(isValidStudentEmail('info@university.com')).toEqual({
        reason:
          'Email address does not seem to belong to an accredited educational institution. Send us an email if you believe your school should qualify.',
        valid: false,
      });
    });
  });
});
