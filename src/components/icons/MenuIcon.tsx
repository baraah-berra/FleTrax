import React from 'react'

type Props = {
    className?: string
}

const MenuIcon = (props: Props) => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" {...props} xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M3.99554 6.53325C3.99554 6.21499 4.12183 5.90977 4.34663 5.68472C4.57142 5.45968 4.87631 5.33325 5.19421 5.33325H19.5782C19.8961 5.33325 20.201 5.45968 20.4258 5.68472C20.6506 5.90977 20.7769 6.21499 20.7769 6.53325C20.7769 6.85151 20.6506 7.15674 20.4258 7.38178C20.201 7.60682 19.8961 7.73325 19.5782 7.73325H5.19421C4.87631 7.73325 4.57142 7.60682 4.34663 7.38178C4.12183 7.15674 3.99554 6.85151 3.99554 6.53325ZM3.99554 12.5333C3.99554 12.215 4.12183 11.9098 4.34663 11.6847C4.57142 11.4597 4.87631 11.3333 5.19421 11.3333H19.5782C19.8961 11.3333 20.201 11.4597 20.4258 11.6847C20.6506 11.9098 20.7769 12.215 20.7769 12.5333C20.7769 12.8515 20.6506 13.1567 20.4258 13.3818C20.201 13.6068 19.8961 13.7333 19.5782 13.7333H5.19421C4.87631 13.7333 4.57142 13.6068 4.34663 13.3818C4.12183 13.1567 3.99554 12.8515 3.99554 12.5333ZM3.99554 18.5332C3.99554 18.215 4.12183 17.9098 4.34663 17.6847C4.57142 17.4597 4.87631 17.3333 5.19421 17.3333H19.5782C19.8961 17.3333 20.201 17.4597 20.4258 17.6847C20.6506 17.9098 20.7769 18.215 20.7769 18.5332C20.7769 18.8515 20.6506 19.1567 20.4258 19.3818C20.201 19.6068 19.8961 19.7332 19.5782 19.7332H5.19421C4.87631 19.7332 4.57142 19.6068 4.34663 19.3818C4.12183 19.1567 3.99554 18.8515 3.99554 18.5332Z" />
        </svg>
    )
}

export default MenuIcon