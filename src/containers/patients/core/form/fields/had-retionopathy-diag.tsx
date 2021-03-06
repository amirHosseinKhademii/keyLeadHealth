import { Switch } from 'components/switch'
import { FC, memo } from 'react'

export const HadretionopathyDiag: FC<IPatientField> = memo(({ control }) => {
  return <Switch label="Retinopathy?" name="retinopathy" control={control} />
})
