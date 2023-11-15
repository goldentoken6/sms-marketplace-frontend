import { usePageView } from 'src/hooks/use-page-view'
import { paths } from 'src/paths'
import { Seo } from 'src/components/seo'
import { useRouter } from 'src/hooks/use-router'
import { useSelector } from 'src/store'
import { useAuth } from 'src/hooks/use-auth'
import { useEffect } from 'react'

const Page = () => {
  // const router = useRouter()

  // const { isAuthenticated, isInitialized } = useAuth()
  // console.log(">>> IsAuth >>", isAuthenticated, isInitialized)
  // useEffect(() => {
  //   // if (!isAuthenticated && isInitialized) {
  //   //   router.push(paths.auth.login)
  //   // } else if (isAuthenticated) {
  //   //   router.push(paths.dashboard.index)
  //   // }
  //   // if (isAuthenticated) {
  //   //   router.push(paths.dashboard.index)
  //   // } else {
  //   //   router.push(paths.auth.login)
  //   // }
  // }, [isAuthenticated])

  usePageView()

  return (
    <>
      <Seo />
    </>
  )
}

export default Page
