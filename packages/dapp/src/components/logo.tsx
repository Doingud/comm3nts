import { HTMLChakraProps, chakra, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

export const Logo = (props: HTMLChakraProps<'svg'>) => {
  const fill = useColorModeValue('#2D3748', '#fff')

  return (
    <chakra.svg 
      width="auto" 
      height="8"
      viewBox="0 0 264 55" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      {...props}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M2.75551 40.6635C4.51983 42.4277 6.91277 43.4188 9.40789 43.4188H11.5789V52.1084C11.5795 52.639 11.7259 53.1593 12.0021 53.6123C12.2784 54.0654 12.6739 54.4337 13.1453 54.6772C13.6168 54.9207 14.1461 55.0299 14.6755 54.993C15.2048 54.956 15.7138 54.7742 16.1468 54.4675L31.7408 43.4188H48.4868C49.7223 43.4188 50.9457 43.1755 52.0871 42.7028C53.2285 42.23 54.2656 41.537 55.1392 40.6635C56.0128 39.7899 56.7058 38.7529 57.1786 37.6115C57.6514 36.4701 57.8947 35.2468 57.8947 34.0114V9.40742C57.8947 8.17202 57.6514 6.94872 57.1786 5.80735C56.7058 4.66599 56.0128 3.62893 55.1392 2.75537C54.2656 1.88181 53.2285 1.18886 52.0871 0.716097C50.9457 0.24333 49.7223 0 48.4868 0H9.40789C6.91277 0 4.51983 0.991135 2.75551 2.75537C0.991186 4.5196 0 6.91241 0 9.40742V34.0114C0 36.5064 0.991186 38.8993 2.75551 40.6635ZM89.777 17.9844H95.3764C95.1974 16.4673 94.7884 15.1207 94.1491 13.9446C93.5185 12.7685 92.7003 11.7756 91.6946 10.9659C90.6889 10.1477 89.5341 9.52557 88.2301 9.09943C86.9347 8.67329 85.5284 8.46023 84.0114 8.46023C81.7102 8.46023 79.6392 8.98864 77.7983 10.0455C75.9574 11.0937 74.5 12.6193 73.4261 14.6222C72.3523 16.625 71.8153 19.054 71.8153 21.9091C71.8153 24.7557 72.3438 27.1804 73.4006 29.1832C74.4659 31.1861 75.9148 32.7159 77.7472 33.7727C79.5881 34.8295 81.6761 35.358 84.0114 35.358C85.6903 35.358 87.1946 35.1065 88.5241 34.6037C89.8622 34.0923 91.0128 33.402 91.9759 32.5327C92.9474 31.6548 93.7188 30.6619 94.2898 29.554C94.8693 28.4375 95.2315 27.2784 95.3764 26.0767L89.777 26.0511C89.6491 26.75 89.419 27.3722 89.0866 27.9176C88.7628 28.4631 88.3537 28.9276 87.8594 29.3111C87.3651 29.6861 86.7983 29.9716 86.1591 30.1676C85.5284 30.3636 84.8423 30.4616 84.1009 30.4616C82.7798 30.4616 81.6165 30.1378 80.6108 29.4901C79.6051 28.8423 78.821 27.8835 78.2585 26.6136C77.7045 25.3438 77.4276 23.7756 77.4276 21.9091C77.4276 20.0938 77.7045 18.5511 78.2585 17.2812C78.8125 16.0028 79.5923 15.0312 80.598 14.3665C81.6037 13.6932 82.7841 13.3565 84.1392 13.3565C84.8892 13.3565 85.5838 13.4631 86.223 13.6761C86.8707 13.8892 87.4418 14.196 87.9361 14.5966C88.4304 14.9972 88.8352 15.483 89.1506 16.054C89.4659 16.6165 89.6747 17.2599 89.777 17.9844ZM102.964 34.1179C104.413 34.9616 106.13 35.3835 108.116 35.3835C110.102 35.3835 111.815 34.9616 113.255 34.1179C114.704 33.2656 115.82 32.081 116.604 30.5639C117.388 29.0384 117.781 27.2699 117.781 25.2585C117.781 23.2301 117.388 21.4574 116.604 19.9403C115.82 18.4148 114.704 17.2301 113.255 16.3864C111.815 15.5341 110.102 15.108 108.116 15.108C106.13 15.108 104.413 15.5341 102.964 16.3864C101.523 17.2301 100.411 18.4148 99.6271 19.9403C98.843 21.4574 98.451 23.2301 98.451 25.2585C98.451 27.2699 98.843 29.0384 99.6271 30.5639C100.411 32.081 101.523 33.2656 102.964 34.1179ZM110.404 30.3977C109.799 30.9091 109.045 31.1648 108.141 31.1648C107.229 31.1648 106.462 30.9091 105.84 30.3977C105.227 29.8778 104.762 29.1705 104.447 28.2756C104.14 27.3807 103.987 26.3622 103.987 25.2202C103.987 24.0781 104.14 23.0597 104.447 22.1648C104.762 21.2699 105.227 20.5625 105.84 20.0426C106.462 19.5227 107.229 19.2628 108.141 19.2628C109.045 19.2628 109.799 19.5227 110.404 20.0426C111.009 20.5625 111.465 21.2699 111.772 22.1648C112.087 23.0597 112.245 24.0781 112.245 25.2202C112.245 26.3622 112.087 27.3807 111.772 28.2756C111.465 29.1705 111.009 29.8778 110.404 30.3977ZM121.322 15.3636V35H126.768V23.2131C126.768 22.4886 126.908 21.858 127.19 21.321C127.471 20.7756 127.85 20.3537 128.327 20.0554C128.813 19.7486 129.359 19.5952 129.964 19.5952C130.859 19.5952 131.579 19.8807 132.124 20.4517C132.678 21.0227 132.955 21.7898 132.955 22.7528V35H138.235V23.0085C138.235 21.9858 138.512 21.1634 139.066 20.5412C139.62 19.9105 140.391 19.5952 141.38 19.5952C142.249 19.5952 142.974 19.8679 143.553 20.4134C144.133 20.9588 144.423 21.777 144.423 22.8679V35H149.856V21.794C149.856 19.6634 149.281 18.0185 148.13 16.8594C146.988 15.6918 145.501 15.108 143.668 15.108C142.228 15.108 140.979 15.4489 139.923 16.1307C138.874 16.804 138.15 17.7031 137.749 18.8281H137.545C137.229 17.6861 136.599 16.7827 135.653 16.1179C134.707 15.4446 133.56 15.108 132.214 15.108C130.884 15.108 129.742 15.4403 128.788 16.1051C127.833 16.7699 127.151 17.6776 126.742 18.8281H126.512V15.3636H121.322ZM154.158 15.3636V35H159.604V23.2131C159.604 22.4886 159.744 21.858 160.026 21.321C160.307 20.7756 160.686 20.3537 161.163 20.0554C161.649 19.7486 162.195 19.5952 162.8 19.5952C163.695 19.5952 164.415 19.8807 164.96 20.4517C165.514 21.0227 165.791 21.7898 165.791 22.7528V35H171.071V23.0085C171.071 21.9858 171.348 21.1634 171.902 20.5412C172.456 19.9105 173.227 19.5952 174.216 19.5952C175.085 19.5952 175.81 19.8679 176.389 20.4134C176.969 20.9588 177.259 21.777 177.259 22.8679V35H182.692V21.794C182.692 19.6634 182.116 18.0185 180.966 16.8594C179.824 15.6918 178.337 15.108 176.504 15.108C175.064 15.108 173.815 15.4489 172.759 16.1307C171.71 16.804 170.986 17.7031 170.585 18.8281H170.381C170.065 17.6861 169.435 16.7827 168.489 16.1179C167.543 15.4446 166.396 15.108 165.05 15.108C163.72 15.108 162.578 15.4403 161.624 16.1051C160.669 16.7699 159.987 17.6776 159.578 18.8281H159.348V15.3636H154.158ZM191.519 34.3736C193.011 35.0298 194.711 35.358 196.62 35.358C198.58 35.358 200.319 35.0256 201.836 34.3608C203.353 33.696 204.542 32.7841 205.403 31.625C206.272 30.4659 206.702 29.1406 206.694 27.6491C206.702 26.0213 206.2 24.6662 205.185 23.5838C204.18 22.4929 202.714 21.8239 200.788 21.5767V21.3722C202.254 21.108 203.442 20.4858 204.354 19.5057C205.275 18.5256 205.731 17.3026 205.722 15.8366C205.731 14.456 205.356 13.2116 204.597 12.1037C203.847 10.9872 202.795 10.1009 201.44 9.4446C200.085 8.78835 198.504 8.46023 196.697 8.46023C194.907 8.46023 193.3 8.78835 191.877 9.4446C190.462 10.0923 189.337 10.9915 188.502 12.142C187.667 13.2926 187.237 14.6222 187.211 16.1307H192.516C192.542 15.4659 192.742 14.8864 193.117 14.392C193.492 13.8977 193.991 13.5185 194.613 13.2543C195.235 12.9815 195.921 12.8452 196.671 12.8452C197.413 12.8452 198.06 12.9858 198.614 13.267C199.177 13.5483 199.612 13.9403 199.918 14.4432C200.234 14.9375 200.391 15.5128 200.391 16.169C200.391 16.8594 200.212 17.4645 199.854 17.9844C199.496 18.4957 198.994 18.8963 198.346 19.1861C197.707 19.4759 196.969 19.6207 196.134 19.6207H193.692V23.6861H196.134C197.123 23.6861 197.975 23.8395 198.691 24.1463C199.415 24.4531 199.969 24.8793 200.353 25.4247C200.745 25.9616 200.941 26.5795 200.941 27.2784C200.941 27.9688 200.758 28.5781 200.391 29.1065C200.025 29.6349 199.518 30.0483 198.87 30.3466C198.222 30.6449 197.477 30.794 196.633 30.794C195.823 30.794 195.094 30.6619 194.447 30.3977C193.799 30.1335 193.279 29.7628 192.887 29.2855C192.504 28.7997 192.295 28.2372 192.261 27.598H186.687C186.712 29.1236 187.151 30.4702 188.004 31.6378C188.864 32.7969 190.036 33.7088 191.519 34.3736ZM216.17 35V23.6477C216.179 22.804 216.336 22.0838 216.643 21.4872C216.958 20.8821 217.393 20.4219 217.947 20.1065C218.51 19.7912 219.157 19.6335 219.89 19.6335C220.981 19.6335 221.838 19.9744 222.46 20.6562C223.082 21.3295 223.389 22.267 223.38 23.4688V35H228.826V22.4972C228.826 20.9716 228.545 19.6591 227.983 18.5597C227.42 17.4517 226.632 16.5994 225.618 16.0028C224.603 15.4062 223.414 15.108 222.051 15.108C220.593 15.108 219.353 15.4446 218.331 16.1179C217.308 16.7827 216.579 17.6861 216.145 18.8281H215.914V15.3636H210.724V35H216.17ZM243.563 19.4545V15.3636H239.869V10.6591H234.423V15.3636H231.738V19.4545H234.423V29.6818C234.414 30.9688 234.683 32.0341 235.228 32.8778C235.773 33.7216 236.536 34.3438 237.516 34.7443C238.505 35.1449 239.656 35.3196 240.968 35.2685C241.675 35.2429 242.276 35.1705 242.771 35.0511C243.265 34.9403 243.648 34.8423 243.921 34.7571L243.065 30.7045C242.928 30.7301 242.732 30.7685 242.477 30.8196C242.221 30.8622 241.965 30.8835 241.71 30.8835C241.343 30.8835 241.019 30.8281 240.738 30.7173C240.465 30.6065 240.252 30.4148 240.099 30.142C239.945 29.8608 239.869 29.4688 239.869 28.9659V19.4545H243.563ZM258.217 21.2699L263.203 20.9631C262.964 19.1562 262.129 17.7287 260.697 16.6804C259.274 15.6321 257.322 15.108 254.842 15.108C253.163 15.108 251.697 15.3551 250.444 15.8494C249.2 16.3438 248.233 17.0469 247.542 17.9588C246.86 18.8707 246.52 19.9574 246.52 21.2188C246.52 22.6847 246.984 23.8906 247.913 24.8366C248.85 25.7827 250.278 26.4474 252.196 26.831L255.596 27.5085C256.449 27.679 257.079 27.9261 257.488 28.25C257.897 28.5653 258.106 28.9702 258.115 29.4645C258.106 30.0526 257.808 30.5341 257.22 30.9091C256.64 31.2756 255.873 31.4588 254.919 31.4588C253.947 31.4588 253.15 31.2543 252.528 30.8452C251.906 30.4276 251.514 29.8224 251.352 29.0298L245.995 29.3111C246.26 31.1861 247.159 32.669 248.693 33.7599C250.235 34.8423 252.306 35.3835 254.906 35.3835C256.61 35.3835 258.115 35.1151 259.419 34.5781C260.731 34.0327 261.762 33.2741 262.512 32.3026C263.271 31.331 263.65 30.2017 263.65 28.9148C263.65 27.5 263.181 26.358 262.244 25.4886C261.306 24.6193 259.883 23.9886 257.974 23.5966L254.42 22.8807C253.508 22.6847 252.865 22.4247 252.49 22.1009C252.115 21.777 251.927 21.3807 251.927 20.9119C251.927 20.3239 252.217 19.8551 252.797 19.5057C253.376 19.1477 254.088 18.9688 254.931 18.9688C255.562 18.9688 256.103 19.0753 256.555 19.2884C257.015 19.4929 257.386 19.7699 257.667 20.1193C257.949 20.4602 258.132 20.8438 258.217 21.2699Z" fill="#1DA1F2"/>
      <path d="M17.1205 12H11.1008C8.69308 12 8.09076 13.0962 8.09076 14.5578V19.3079C8.09076 21.5003 11.1006 22.2311 12.6055 21.1349C12.0036 22.5965 9.84663 25.3979 8.84342 26.6159C6.20991 29.8135 10.3483 33.5583 12.982 31.0006C14.7879 29.2467 16.4934 26.6159 17.1205 25.5197C19.5284 21.1349 20.1303 16.872 20.1303 15.2886C20.1303 12.6577 18.1238 12 17.1205 12Z" fill="white"/>
      <path d="M32.5595 12H26.5398C24.132 12 23.5297 13.0962 23.5297 14.5578V19.3079C23.5297 21.5003 26.5396 22.2311 28.0445 21.1349C27.4425 22.5965 25.2856 25.3979 24.2824 26.6159C21.6489 29.8135 25.7872 33.5583 28.4209 31.0006C30.2268 29.2467 31.9324 26.6159 32.5595 25.5197C34.9673 21.1349 35.5693 16.872 35.5693 15.2886C35.5693 12.6577 33.5627 12 32.5595 12Z" fill="white"/>
      <path d="M48.5492 12H42.5295C40.1218 12 39.5195 13.0962 39.5195 14.5578V19.3079C39.5195 21.5003 42.5293 22.2311 44.0342 21.1349C43.4323 22.5965 41.2753 25.3979 40.2721 26.6159C37.6386 29.8135 41.777 33.5583 44.4107 31.0006C46.2166 29.2467 47.9221 26.6159 48.5492 25.5197C50.9571 21.1349 51.559 16.872 51.559 15.2886C51.559 12.6577 49.5525 12 48.5492 12Z" fill="white"/>
    </chakra.svg>
    // <chakra.svg
    //   height='8'
    //   width='auto'
    //   viewBox='0 0 1200 257'
    //   fill='none'
    //   xmlns='http://www.w3.org/2000/svg'
    //   {...props}
    // >
    //   <text x="320" y="200" fill={fill} style={{fontSize: '11rem'}}>Comm3nts</text>
    //   {/* <path
    //     d='M388.5 115.302c17.612 0 25.466 11.424 28.084 21.658l24.752-9.044c-4.76-18.564-21.896-38.08-53.074-38.08-33.32 0-59.262 25.704-59.262 61.404 0 35.224 25.942 61.642 59.976 61.642 30.464 0 47.838-19.754 53.312-37.842l-24.276-8.806c-2.618 8.806-10.948 21.42-29.036 21.42-17.374 0-32.368-13.09-32.368-36.414s14.994-35.938 31.892-35.938zM484.894 141.244c.476-14.756 8.806-26.18 24.038-26.18 17.374 0 23.8 11.424 23.8 25.704v68.544h27.608v-73.304c0-25.466-13.804-45.934-42.364-45.934-12.138 0-25.228 4.284-33.082 14.518V37h-27.608v172.312h27.608v-68.068zM577.29 177.896c0 18.326 14.994 34.986 39.27 34.986 18.802 0 30.226-9.52 35.7-18.326 0 9.282.952 14.042 1.19 14.756h25.704c-.238-1.19-1.428-8.092-1.428-18.564v-57.596c0-23.086-13.566-43.316-49.266-43.316-28.56 0-46.648 17.85-48.79 37.842l25.228 5.712c1.19-11.662 9.282-20.944 23.8-20.944 15.232 0 21.896 7.854 21.896 17.612 0 4.046-1.904 7.378-8.568 8.33l-29.75 4.522c-19.754 2.856-34.986 14.28-34.986 34.986zm44.506 13.328c-10.948 0-16.898-7.14-16.898-14.994 0-9.52 6.902-14.28 15.47-15.708L650.594 156v5.236c0 22.61-13.328 29.988-28.798 29.988zM810.108 93.406h-36.652l-44.506 46.886V37h-27.37v172.312h27.37v-32.368l14.28-14.994 34.034 47.362h33.796l-48.552-66.878 47.6-49.028zM889.349 92.692c-1.19-.238-4.046-.714-7.378-.714-15.232 0-28.084 7.378-33.558 19.992V93.406h-26.894v115.906h27.608v-55.216c0-21.658 9.758-34.034 31.178-34.034 2.856 0 5.95.238 9.044.714V92.692zM895.968 177.896c0 18.326 14.994 34.986 39.27 34.986 18.802 0 30.226-9.52 35.7-18.326 0 9.282.952 14.042 1.19 14.756h25.704c-.238-1.19-1.428-8.092-1.428-18.564v-57.596c0-23.086-13.566-43.316-49.266-43.316-28.56 0-46.648 17.85-48.79 37.842l25.228 5.712c1.19-11.662 9.282-20.944 23.8-20.944 15.232 0 21.896 7.854 21.896 17.612 0 4.046-1.904 7.378-8.568 8.33l-29.75 4.522c-19.754 2.856-34.986 14.28-34.986 34.986zm44.506 13.328c-10.948 0-16.898-7.14-16.898-14.994 0-9.52 6.902-14.28 15.47-15.708L969.272 156v5.236c0 22.61-13.328 29.988-28.798 29.988z'
    //     fill={fill}
    //   /> */}
    //   <rect width='257' height='257' rx='128.5' fill='url(#logo)' />
    //   <path
    //     d='M69.558 133.985l87.592-86.9891c1.636-1.6251 4.27.3525 3.165 2.377l-32.601 59.7521c-.728 1.332.237 2.958 1.755 2.958h56.34c1.815 0 2.691 2.223 1.364 3.462l-98.7278 92.142c-1.7702 1.652-4.4051-.676-2.9839-2.636l46.7357-64.473c.958-1.322.014-3.174-1.619-3.174H70.9673c-1.7851 0-2.6759-2.161-1.4093-3.419z'
    //     fill='#fff'
    //   />
    //   <defs>
    //     <linearGradient
    //       id='logo'
    //       x1='128.5'
    //       x2='128.5'
    //       y2='257'
    //       gradientUnits='userSpaceOnUse'
    //     >
    //       <stop stopColor='#7BCBD4' />
    //       <stop offset='1' stopColor='#29C6B7' />
    //     </linearGradient>
    //   </defs>
    // </chakra.svg>
  )
}

export const LogoIcon = (props: HTMLChakraProps<'svg'>) => {
  return (
    <chakra.svg 
      width="auto" 
      height="8"
      viewBox="0 0 58 55"
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      {...props}
    >
      <path d="M9.40789 43.4188C6.91277 43.4188 4.51983 42.4277 2.75551 40.6635C0.991186 38.8992 0 36.5064 0 34.0114V9.40742C0 6.91241 0.991186 4.5196 2.75551 2.75537C4.51983 0.991135 6.91277 0 9.40789 0H48.4868C49.7223 0 50.9457 0.24333 52.0871 0.716097C53.2285 1.18886 54.2656 1.88181 55.1392 2.75537C56.0128 3.62893 56.7058 4.66599 57.1786 5.80735C57.6514 6.94872 57.8947 8.17202 57.8947 9.40742V34.0114C57.8947 35.2468 57.6514 36.4701 57.1786 37.6115C56.7058 38.7529 56.0128 39.7899 55.1392 40.6635C54.2656 41.537 53.2285 42.23 52.0871 42.7028C50.9457 43.1755 49.7223 43.4188 48.4868 43.4188H31.7408L16.1468 54.4675C15.7138 54.7742 15.2048 54.956 14.6755 54.993C14.1461 55.0299 13.6168 54.9207 13.1453 54.6772C12.6739 54.4337 12.2784 54.0654 12.0021 53.6123C11.7259 53.1593 11.5795 52.639 11.5789 52.1084V43.4188H9.40789Z" fill="#1DA1F2"/>
      <path d="M17.1205 12H11.1008C8.69308 12 8.09076 13.0962 8.09076 14.5578V19.3079C8.09076 21.5003 11.1006 22.2311 12.6055 21.1349C12.0036 22.5965 9.84663 25.3979 8.84342 26.6159C6.20991 29.8135 10.3483 33.5583 12.982 31.0006C14.7879 29.2467 16.4934 26.6159 17.1205 25.5197C19.5284 21.1349 20.1303 16.872 20.1303 15.2886C20.1303 12.6577 18.1238 12 17.1205 12Z" fill="white"/>
      <path d="M32.5595 12H26.5398C24.132 12 23.5297 13.0962 23.5297 14.5578V19.3079C23.5297 21.5003 26.5396 22.2311 28.0445 21.1349C27.4425 22.5965 25.2856 25.3979 24.2824 26.6159C21.6489 29.8135 25.7872 33.5583 28.4209 31.0006C30.2268 29.2467 31.9324 26.6159 32.5595 25.5197C34.9673 21.1349 35.5693 16.872 35.5693 15.2886C35.5693 12.6577 33.5627 12 32.5595 12Z" fill="white"/>
      <path d="M48.5492 12H42.5295C40.1218 12 39.5195 13.0962 39.5195 14.5578V19.3079C39.5195 21.5003 42.5293 22.2311 44.0342 21.1349C43.4323 22.5965 41.2753 25.3979 40.2721 26.6159C37.6386 29.8135 41.777 33.5583 44.4107 31.0006C46.2166 29.2467 47.9221 26.6159 48.5492 25.5197C50.9571 21.1349 51.559 16.872 51.559 15.2886C51.559 12.6577 49.5525 12 48.5492 12Z" fill="white"/>
    </chakra.svg>
  )
}

export default Logo