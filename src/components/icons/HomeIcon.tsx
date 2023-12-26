import React from 'react'

type Props = {
    className?: string
}

const HomeIcon = (props: Props) => {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M8.0236 0.746432C9.2151 -0.0687977 10.7849 -0.0687977 11.9764 0.746432L18.4764 5.1938C19.4299 5.84619 20 6.92707 20 8.0824V16.5C20 18.433 18.433 20 16.5 20H3.5C1.567 20 0 18.433 0 16.5V8.0824C0 6.92707 0.57012 5.84619 1.52361 5.1938L8.0236 0.746432ZM7.5 15.5C7.22386 15.5 7 15.7239 7 16C7 16.2761 7.22386 16.5 7.5 16.5H12.5C12.7761 16.5 13 16.2761 13 16C13 15.7239 12.7761 15.5 12.5 15.5H7.5Z" />
        </svg>
    )
}

export default HomeIcon