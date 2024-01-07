import React from 'react'

type Props = {
    active?: boolean
}

const DeiceStatus = ({ active }: Props) => {
    return (
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_di_83_1188)">
                <circle cx="16" cy="16" r="8" fill="#FEFFFD" />
                <circle cx="16" cy="16" r="5" className={active ? 'fill-primary' : 'fill-primary-100'} />
            </g>
            <defs>
                <filter id="filter0_di_83_1188" x="0" y="0" width="36" height="36" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feMorphology radius="2" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_83_1188" />
                    <feOffset dx="2" dy="2" />
                    <feGaussianBlur stdDeviation="4" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.321569 0 0 0 0 0.443137 0 0 0 0 1 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_83_1188" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_83_1188" result="shape" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feMorphology radius="2" operator="erode" in="SourceAlpha" result="effect2_innerShadow_83_1188" />
                    <feOffset dx="-2" dy="-2" />
                    <feGaussianBlur stdDeviation="4" />
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.321569 0 0 0 0 0.443137 0 0 0 0 1 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="shape" result="effect2_innerShadow_83_1188" />
                </filter>
            </defs>
        </svg>
    )
}

export default DeiceStatus