import { Spinner } from '@nextui-org/react'
import React from 'react'

type Props = {}

const PageLoader = (props: Props) => {
    return (
        <div className='w-screen h-96 flex justify-center items-center'>
            <Spinner size='lg' />
        </div>
    )
}

export default PageLoader