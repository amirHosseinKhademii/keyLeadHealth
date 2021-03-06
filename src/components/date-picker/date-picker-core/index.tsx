import { FC, useEffect, useMemo, useRef } from 'react'
import { Error } from 'components/error'
import DatePickerReact from 'react-datepicker'
import { v4 as uuid } from 'uuid'

import 'react-datepicker/dist/react-datepicker.css'
import { DatePickerLable } from '../date-picker-label'
import { datePickerOnChange } from './helper'
import { DatePickerBox } from '../date-picker-box'

export const DatePickerCore: FC<IDatePicker> = ({
  className,
  value,
  label,
  error,
  year,
  time,
  onChange,
  defaultValue,
}) => {
  const ref = useRef(null)
  const id = useMemo(() => uuid(), [])
  // useEffect(() => {
  //   error && ref.current.scrollIntoView()
  // }, [error])

  return (
    <div className={`w-full col-start relative ${className}`} ref={ref}>
      <DatePickerLable label={label} />
      <Error error={error} className=" absolute left-0 top-20 -mt-2" />
      <DatePickerReact
        id={id}
        closeOnScroll={true}
        placeholderText="Click here"
        dateFormat="yyyy/MM/dd"
        showYearPicker={year}
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        className=" z-50 opacity-0"
        showTimeSelect={time}
        onChange={(date) => datePickerOnChange(date, time, onChange)}
      />
      <DatePickerBox
        id={id}
        defaultValue={defaultValue}
        value={value}
        time={time}
        error={error}
      />
    </div>
  )
}
