CREATE OR REPLACE FUNCTION projects_recalculate_credits() returns trigger as $$
BEGIN
    UPDATE public."ProjectsProfile"
    SET credits = (
        SELECT SUM(CASE WHEN type = 'CREDIT' THEN amount ELSE -amount END)
        FROM public."ProjectsChallengeCreditTransaction"
        WHERE "profileId" = NEW."profileId"
    )
    WHERE id = NEW."profileId";
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY definer;

CREATE TRIGGER projects_credits_transactions_all_changes
AFTER INSERT OR UPDATE OR DELETE ON public."ProjectsChallengeCreditTransaction"
FOR EACH ROW
EXECUTE FUNCTION projects_recalculate_credits();
