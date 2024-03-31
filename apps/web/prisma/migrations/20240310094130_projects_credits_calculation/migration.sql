CREATE OR REPLACE FUNCTION projects_recalculate_credits() returns trigger as $$
BEGIN
    UPDATE public."ProjectsProfile"
    SET credits = (
        -- Use COALESCE to handle NULL case
        SELECT COALESCE(SUM(CASE WHEN type = 'CREDIT' THEN amount ELSE -amount END), 0)
        FROM public."ProjectsChallengeCreditTransaction"
        -- Select the appropriate profileId
        WHERE "profileId" = COALESCE(NEW."profileId", OLD."profileId")
    )
    -- Select the appropriate profileId
    WHERE id = COALESCE(NEW."profileId", OLD."profileId");
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY definer;

CREATE TRIGGER projects_credits_transactions_all_changes
AFTER INSERT OR UPDATE OR DELETE ON public."ProjectsChallengeCreditTransaction"
FOR EACH ROW
EXECUTE FUNCTION projects_recalculate_credits();
