import { FC, memo } from 'react'
import { Select } from 'components/select'

export const CurrentCGMWear: FC<IPatientField> = memo(
  ({ control, setValue }) => {
    return (
      <Select
        label="Current CGM Wear"
        name="current_cgm_wear"
        control={control}
        setValue={setValue}
      >
        <option value="Libre">Libre</option>
        <option value="Guardian Connect">Guardian Connect</option>
        <option value="Guardian Sensor 3">Guardian Sensor 3</option>
        <option value="Dexcom G5">Dexcom G5</option>
        <option value="Dexcom G6">Dexcom G6</option>
        <option value="None">None</option>
      </Select>
    )
  }
)
