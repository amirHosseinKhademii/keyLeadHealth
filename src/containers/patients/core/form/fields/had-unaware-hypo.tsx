import { Switch } from "components/switch";
import { FC, memo } from "react";

export const HadUnawareHypo: FC<IPatientField> = memo(({ control }) => {
  return (
    <Switch
      label="Hypo-unawareness?"
      name="hypo_unawareness"
      control={control}
    />
  );
});
