import { DropDown, DropDownOption } from 'components'
import { ICPeoples } from 'icons'
import { FC, memo } from 'react'
import { classNames } from 'utils/classes'

export const PatientDropDown: FC<{
  pathname?: string
  push?: any
  dark?: boolean
}> = memo(({ pathname, push, dark }) => {
  return (
    <DropDown
      label="Patients"
      active={pathname.includes('patients')}
      icon={() => (
        <ICPeoples
          className={classNames(
            'w-6 h-6 mx-3 cursor-pointer ',
            dark ? 'text-gray-300' : 'text-gray-500'
          )}
          onClick={(e) => {
            e.stopPropagation()
            push('/admin/patients')
          }}
        />
      )}
    >
      <DropDownOption
        onClick={() => push('/admin/patients')}
        active={pathname === '/admin/patients'}
      >
        List
      </DropDownOption>
      <DropDownOption
        onClick={() => push('/admin/patients/add')}
        active={pathname === '/admin/patients/add'}
      >
        Add
      </DropDownOption>
    </DropDown>
  )
})
