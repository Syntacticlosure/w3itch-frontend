import GameForm from 'components/Game/Form'
import type { NextPage } from 'next'
import { MutableRefObject, useCallback, useState } from 'react'
import { DefaultValues, useForm } from 'react-hook-form'
import { Community, EditorMode, Genre, PaymentMode } from 'types/enum'
import { Game } from 'utils/validator'
const resolverGame = classValidatorResolver(Game)
import { classValidatorResolver } from '@hookform/resolvers/class-validator'
import { Editor } from '@toast-ui/react-editor'

const GameCreate: NextPage = () => {
  const [editorRef, setEditorRef] = useState<MutableRefObject<Editor>>()

  const [defaultValue] = useState<DefaultValues<Game>>({
    paymentMode: PaymentMode.DISABLE_PAYMENTS,
    community: Community.DISABLED,
    genre: Genre.ROLE_PLAYING,
    tags: [],
    appStoreLinks: [],
    screenshots: [],
    cover: '',
  })

  const { register, handleSubmit, setValue, control, watch, formState } =
    useForm<Game>({
      resolver: resolverGame,
      defaultValues: defaultValue,
    })

  // create game
  const createGame = useCallback(async () => {
    //
  }, [])

  return (
    <GameForm
      editorMode={EditorMode.CREATE}
      register={register}
      handleSubmit={handleSubmit}
      setValue={setValue}
      control={control}
      watch={watch}
      formState={formState}
      editorRef={editorRef}
      setEditorRef={setEditorRef}
    ></GameForm>
  )
}

export default GameCreate
