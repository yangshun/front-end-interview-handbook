CREATE OR REPLACE FUNCTION create_profile_for_user() returns trigger as $$
BEGIN
    INSERT INTO public."Profile"(id)
      values(NEW.id);

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY definer;

-- Manually run the following in SQL as Prisma does not have access to auth schema.

-- CREATE TRIGGER create_new_profile_for_user
-- AFTER INSERT ON auth.users
-- FOR EACH ROW
-- EXECUTE FUNCTION create_profile_for_user();
