import { getTranslations } from 'next-intl/server'
import { FolderEditor } from '@/components/configuration/foder-editor'

export default async function Page() {
  // const t = await getTranslations('HomePage')/
  return (
    <>

      <FolderEditor />

    </>
  )
}
