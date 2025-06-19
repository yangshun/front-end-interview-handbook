import { isValidStudentEmail } from './studentEmail';

describe('isValidStudentEmail', () => {
  describe('valid emails', () => {
    describe('.edu emails', () => {
      test('.edu suffix', () => {
        expect(isValidStudentEmail('john.doe@u.nus.edu').valid).toBe(true);
        expect(isValidStudentEmail('john.doe@hawk.iit.edu').valid).toBe(true);
        expect(isValidStudentEmail('john.doe@g.ucla.edu').valid).toBe(true);
        expect(isValidStudentEmail('john.doe@ufl.edu').valid).toBe(true);
      });

      test('.edu in the middle', () => {
        expect(isValidStudentEmail('john.doe@ci.suez.edu.eg').valid).toBe(true);
        expect(
          isValidStudentEmail('aabhishekbtech20@ced.alliance.edu.in').valid,
        ).toBe(true);
      });

      test('.edu prefix', () => {
        expect(isValidStudentEmail('abdi.bala@edu.uwaterloo.ca').valid).toBe(
          true,
        );
      });
    });

    describe('.ac emails', () => {
      test('.ac.in substrings', () => {
        expect(isValidStudentEmail('sahil.khan@iiitg.ac.in').valid).toBe(true);
        expect(isValidStudentEmail('prathamesh.redij@spit.ac.in').valid).toBe(
          true,
        );
        expect(isValidStudentEmail('nishtha.kumari@nift.ac.in').valid).toBe(
          true,
        );
        expect(
          isValidStudentEmail('fitri.anjaini3279@student.unri.ac.id').valid,
        ).toBe(true);
      });

      test('.ac suffixes', () => {
        expect(isValidStudentEmail('sahil.khan@iiitg.ac').valid).toBe(true);
        expect(isValidStudentEmail('prathamesh.redij@spit.ac').valid).toBe(
          true,
        );
        expect(isValidStudentEmail('nishtha.kumari@nift.ac').valid).toBe(true);
      });
    });

    test('.ca suffixes', () => {
      expect(isValidStudentEmail('greg@humbermail.ca').valid).toBe(true);
      expect(isValidStudentEmail('chen@utoronto.ca').valid).toBe(true);
      expect(isValidStudentEmail('ksaraf@student.ubc.ca').valid).toBe(true);
    });
  });

  describe('invalid emails', () => {
    test('invalid email format', () => {
      expect(isValidStudentEmail('john.doe@').valid).toBe(false);

      expect(isValidStudentEmail('jane.smith').valid).toBe(false);

      expect(isValidStudentEmail('info').valid).toBe(false);
    });

    test('alumni domains', () => {
      expect(isValidStudentEmail('john.doe@alumn.mit.edu').valid).toBe(false);
      expect(isValidStudentEmail('john.doe@alumni.princeton.edu').valid).toBe(
        false,
      );
      expect(
        isValidStudentEmail('john.doe@formerstudents.ucdavis.edu').valid,
      ).toBe(false);
    });

    test("domain doesn't contain .edu", () => {
      expect(isValidStudentEmail('john.doe@example.com').valid).toBe(false);
      expect(isValidStudentEmail('john.edu@example.com').valid).toBe(false);
      expect(isValidStudentEmail('john.doe@student.org').valid).toBe(false);
      expect(isValidStudentEmail('john.doe@university.com').valid).toBe(false);
      expect(isValidStudentEmail('jane.smith@gmail.com').valid).toBe(false);
      expect(isValidStudentEmail('john.doe.example.edu').valid).toBe(false);
      expect(isValidStudentEmail('john.doe@university.com').valid).toBe(false);
    });

    test('disposable domains', () => {
      expect(isValidStudentEmail('john.doe@fast.edu.pl').valid).toBe(false);
      expect(isValidStudentEmail('john.doe@mail.fast.edu.pl').valid).toBe(
        false,
      );
    });

    test('blocked domains', () => {
      expect(isValidStudentEmail('john.doe@vistula.edu.pl').valid).toBe(false);
    });
  });
});
