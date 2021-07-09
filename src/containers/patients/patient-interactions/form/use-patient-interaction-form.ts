import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useError, useService, useToast, useUi } from 'hooks'
import { Api } from 'utils'
import { useParams } from 'react-router-dom'

export const usePatientInteractionForm = () => {
  const { id } = useParams() as any
  const { usePost, usePut, client } = useService()
  const { onError } = useError()
  const { success } = useToast()
  const {
    toggleDialog,
    uiState: {
      dialog: { data, queryKey },
    },
  } = useUi()

  const { control, handleSubmit, setValue } = useForm({
    defaultValues:
      data && data.isEditing
        ? {
            interaction_type: data.interaction_type,
            interaction_datetime: data.interaction_datetime,
            contact_admin: data.contact_admin,
            contact_details: data.contact_details,
          }
        : {},
  })

  const { mutate: save, isLoading: saveLoading } = usePost({
    url: Api.interactions,
    onMutate: async ({ payload }) => {
      await client.cancelQueries(queryKey)
      const snapshot = client.getQueryData(queryKey)
      client.setQueryData(queryKey, (old: any) => {
        old.data.results = [
          payload,
          ...old.data.results.filter(
            (item, index) => index !== old.data.results.length - 1
          ),
        ]
        return old
      })
      toggleDialog({ open: false, type: null, data: {} })
      return { snapshot }
    },
    onError: (error, data, context) => {
      client.setQueryData(queryKey, context.snapshot)
      onError(error)
    },
    onSettled: (data, error) => {
      if (error) onError(error)
      success('You successfully add an interaction.')
      client.invalidateQueries(queryKey)
    },
  })

  const { mutate: edit, isLoading: editLoading } = usePut({
    url: data ? `${Api.interactions}/${data.id}/` : '',
    onMutate: async ({ payload }) => {
      await client.cancelQueries(queryKey)
      const snapshot = client.getQueryData(queryKey)
      client.setQueryData(queryKey, (old: any) => {
        old.data.results = old.data.results.map((item) =>
          item.id == data.id ? payload : item
        )
        return old
      })
      toggleDialog({ open: false, type: null, data: {} })
      return { snapshot }
    },
    onError: (error, data, context) => {
      client.setQueryData(queryKey, context.snapshot)
      onError(error)
    },
    onSettled: (data, error) => {
      if (error) onError(error)
      success('You successfully edit this interaction.')
      client.invalidateQueries(queryKey)
    },
  })

  return {
    control,
    setValue,
    isLoading: useMemo(
      () => saveLoading || editLoading,
      [saveLoading, editLoading]
    ),
    onSubmit: handleSubmit((state) => {
      const payload = {
        ...state,
        patient: parseInt(id),
        interaction_datetime:
          state.interaction_datetime ||
          `${new Date().toISOString().slice(0, 10)} ${new Date()
            .toISOString()
            .slice(11, 16)}`,
      }
      data && data.isEditing ? edit({ payload }) : save({ payload })
    }),
  }
}