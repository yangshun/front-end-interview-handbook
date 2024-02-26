CREATE OR REPLACE FUNCTION projects_recalculate_points() returns trigger as $$
BEGIN
    UPDATE public."ProjectsProfile"
    SET points = (
        SELECT COALESCE(SUM(points), 0) -- Use COALESCE to handle NULL case
        FROM public."ProjectsReputationPoint"
        -- Select the appropriate profileId
        WHERE "profileId" = COALESCE(NEW."profileId", OLD."profileId")
    )
    -- Select the appropriate profileId
    WHERE id = COALESCE(NEW."profileId", OLD."profileId");
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY definer;