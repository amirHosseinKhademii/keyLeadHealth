import { DatePicker } from 'components/date-picker'
import { FC, memo } from 'react'

export const LatestHBA1CReadingDate: FC<IPatientField> = memo(({ control }) => {
  return (
    <DatePicker
      label="Latest HbA1c Reading Date"
      name="latest_hba1c_reading_date"
      control={control}
    />
  )
})
