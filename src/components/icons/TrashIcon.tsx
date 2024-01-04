import React from 'react'

type Props = {
    className?: string
}

const TrashIcon = (props: Props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" {...props}>
            <path d="M5.12817 8.65381V15.6282C5.23074 16.9615 5.3333 18.7051 5.43587 19.9359C5.53843 21.3718 6.7692 22.5 8.2051 22.5H15.7948C17.2307 22.5 18.4615 21.3718 18.5641 19.9359C18.6666 18.7051 18.7692 16.9615 18.8718 15.6282C18.9743 14.0897 18.8718 10.9102 18.8718 8.65381H5.12817Z" />
            <path d="M19.1795 5.57692H16.6154L15.7949 4.03846C15.2821 3.11539 14.359 2.5 13.3333 2.5H10.8718C9.84615 2.5 8.82051 3.11539 8.41026 4.03846L7.38462 5.57692H4.82051C4.41026 5.57692 4 5.98718 4 6.39744C4 6.80769 4.41026 7.21795 4.82051 7.21795H19.1795C19.5897 7.21795 20 6.91026 20 6.39744C20 5.88462 19.5897 5.57692 19.1795 5.57692ZM9.12821 5.57692L9.64103 4.75641C9.84615 4.34615 10.2564 4.03846 10.7692 4.03846H13.2308C13.7436 4.03846 14.1538 4.24359 14.359 4.75641L14.8718 5.57692H9.12821Z" />
        </svg>
    )
}

export default TrashIcon