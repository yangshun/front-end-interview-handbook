CREATE OR REPLACE FUNCTION projects_recalculate_points() returns trigger as $$
BEGIN
    UPDATE public."ProjectsProfile"
    SET points = (
        SELECT SUM(points)
        FROM public."ProjectsReputationPoint"
        WHERE "profileId" = NEW."profileId"
    )
    WHERE id = NEW."profileId";
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY definer;

CREATE TRIGGER projects_points_all_changes
AFTER INSERT OR UPDATE OR DELETE ON public."ProjectsReputationPoint"
FOR EACH ROW
EXECUTE FUNCTION projects_recalculate_points();
