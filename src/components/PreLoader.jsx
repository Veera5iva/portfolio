import { useEffect } from 'react';
import './Preloader.css';

const Preloader = ({onAnimationComplete}) => {
   useEffect(() => {
      const timer = setTimeout(() => {
         onAnimationComplete();
      }, 6400); // Matches the animation duration (6.4s)

      return () => clearTimeout(timer);
   }, [onAnimationComplete]);
  
   return (
      <div className="bg-black h-screen flex justify-center items-center preloader">
         <svg width="211" height="53" viewBox="0 0 211 53" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
               d="M186.974 46.944C186.078 46.944 185.086 46.464 183.998 45.504C182.91 44.48 182.366 43.488 182.366 42.528H182.27C182.334 42.272 182.398 41.664 182.462 40.704C182.526 39.744 182.686 39.232 182.942 39.168V38.976C183.006 38.912 183.166 38.656 183.422 38.208C183.678 37.76 183.934 37.28 184.19 36.768C184.51 36.256 184.702 35.936 184.766 35.808C184.958 35.488 185.47 34.88 186.302 33.984C187.134 33.024 187.998 32.128 188.894 31.296C189.79 30.464 190.366 30.048 190.622 30.048C191.006 29.472 191.71 28.832 192.734 28.128C193.822 27.424 194.91 26.752 195.998 26.112C197.15 25.472 197.95 25.024 198.398 24.768V24.672L198.494 24.768H198.59C198.846 24.512 199.326 24.256 200.03 24C200.798 23.68 201.31 23.488 201.566 23.424C202.014 23.232 202.462 23.104 202.91 23.04C203.358 22.976 203.806 22.912 204.254 22.848C204.574 22.912 204.894 22.944 205.214 22.944C205.598 22.944 205.95 22.976 206.27 23.04C206.91 23.168 207.614 23.52 208.382 24.096C209.15 24.608 209.534 25.248 209.534 26.016C209.47 26.08 209.406 26.176 209.342 26.304C209.278 26.432 209.278 26.528 209.342 26.592L208.958 26.4C208.574 25.696 207.998 25.28 207.23 25.152C206.462 24.96 205.726 24.864 205.022 24.864C203.294 24.864 201.47 25.312 199.55 26.208C197.63 27.04 195.742 28.16 193.886 29.568C192.03 30.976 190.366 32.48 188.894 34.08C187.486 35.68 186.43 37.216 185.726 38.688L185.438 39.84C185.31 40.48 185.118 41.088 184.862 41.664C184.606 42.24 184.478 42.88 184.478 43.584C184.478 44.096 184.542 44.48 184.67 44.736C184.798 44.928 185.022 45.248 185.342 45.696L185.534 45.6V45.696L185.726 45.504L186.11 45.6C186.558 45.344 187.038 45.152 187.55 45.024C188.062 44.832 188.478 44.576 188.798 44.256L188.99 44.064C189.374 43.936 189.726 43.712 190.046 43.392C190.366 43.072 190.654 42.784 190.91 42.528C191.87 41.632 192.83 40.736 193.79 39.84C194.75 38.944 195.646 38.016 196.478 37.056C196.926 36.544 197.502 35.904 198.206 35.136C198.91 34.368 199.518 33.824 200.03 33.504L200.126 33.12C200.638 32.928 201.118 32.48 201.566 31.776C202.078 31.072 202.558 30.4 203.006 29.76C203.518 29.056 203.998 28.704 204.446 28.704L204.83 28.608C205.342 28.608 205.758 28.832 206.078 29.28C206.398 29.664 206.558 30.08 206.558 30.528C206.558 31.04 206.398 31.616 206.078 32.256C205.758 32.896 205.534 33.472 205.406 33.984C205.086 35.328 204.862 36.544 204.734 37.632C204.606 38.656 204.542 39.84 204.542 41.184C204.542 42.016 204.67 42.72 204.926 43.296C205.246 43.872 205.694 44.48 206.27 45.12H206.75C207.646 44.608 208.286 44.064 208.67 43.488C209.054 42.912 209.534 42.304 210.11 41.664C210.174 41.664 210.238 41.632 210.302 41.568C210.366 41.504 210.398 41.472 210.398 41.472C210.526 41.472 210.59 41.536 210.59 41.664C210.59 41.92 210.526 42.176 210.398 42.432C210.334 42.624 210.27 42.88 210.206 43.2C210.078 43.904 209.886 44.576 209.63 45.216C209.438 45.792 208.83 46.08 207.806 46.08C207.23 46.08 206.59 45.952 205.886 45.696C205.182 45.44 204.606 45.088 204.158 44.64C203.198 43.552 202.59 42.368 202.334 41.088C202.142 39.744 202.046 38.368 202.046 36.96V33.888H201.854C201.598 34.272 201.31 34.656 200.99 35.04C200.67 35.424 200.35 35.808 200.03 36.192C199.774 36.448 199.454 36.736 199.07 37.056C198.75 37.312 198.462 37.632 198.206 38.016C198.078 38.016 197.822 38.24 197.438 38.688C197.118 39.072 196.958 39.36 196.958 39.552C196.51 39.616 195.998 40 195.422 40.704C194.91 41.408 194.558 41.76 194.366 41.76C194.302 41.952 194.078 42.272 193.694 42.72C193.31 43.104 193.022 43.392 192.83 43.584C192.382 43.648 191.998 43.872 191.678 44.256C191.422 44.64 191.166 44.992 190.91 45.312C190.334 45.568 189.694 45.92 188.99 46.368C188.286 46.752 187.614 46.944 186.974 46.944Z"
               fill="white" />
            <path
               d="M165.445 49.152C164.613 49.152 164.069 48.768 163.813 48C163.557 47.296 163.461 46.592 163.525 45.888C163.717 44.544 164.005 43.168 164.389 41.76C164.773 40.352 165.157 38.976 165.541 37.632C165.861 36.736 166.053 35.84 166.117 34.944C166.245 33.984 166.405 33.056 166.597 32.16C166.725 31.712 166.821 31.296 166.885 30.912C166.949 30.464 167.013 30.016 167.077 29.568C167.141 29.312 167.173 29.088 167.173 28.896C167.173 28.64 167.173 28.448 167.173 28.32C167.173 27.744 167.013 27.36 166.693 27.168C166.437 26.976 165.893 26.88 165.061 26.88C165.189 26.624 165.413 26.528 165.733 26.592C166.053 26.592 166.341 26.56 166.597 26.496L166.789 26.4H168.133C168.773 26.4 169.285 26.656 169.669 27.168C170.117 27.68 170.341 28.224 170.341 28.8C170.341 29.184 170.277 29.568 170.149 29.952C170.021 30.272 169.925 30.624 169.861 31.008V31.296C169.861 31.936 169.701 32.576 169.381 33.216C169.061 33.856 168.773 34.496 168.517 35.136C168.453 35.456 168.389 35.808 168.325 36.192C168.261 36.576 168.165 36.928 168.037 37.248C167.845 37.696 167.621 38.144 167.365 38.592C167.109 38.976 166.885 39.392 166.693 39.84C166.629 40.16 166.405 40.832 166.021 41.856C165.701 42.816 165.509 43.552 165.445 44.064V44.256L165.637 44.352V44.256C167.429 41.632 169.253 39.104 171.109 36.672C173.029 34.176 175.173 31.84 177.541 29.664C178.437 28.768 179.365 27.904 180.325 27.072C181.285 26.24 182.373 25.6 183.589 25.152C184.101 24.96 184.581 24.864 185.029 24.864C186.245 24.864 187.109 25.248 187.621 26.016C187.749 26.144 187.813 26.368 187.813 26.688C187.813 27.136 187.557 27.136 187.045 26.688C186.789 26.496 186.469 26.4 186.085 26.4C185.701 26.4 185.349 26.4 185.029 26.4C184.773 26.4 184.325 26.56 183.685 26.88C183.045 27.136 182.437 27.456 181.861 27.84C181.349 28.16 181.061 28.48 180.997 28.8C180.677 28.864 180.421 29.024 180.229 29.28C180.037 29.536 179.813 29.792 179.557 30.048L178.981 30.432L176.677 32.736V33.024C176.485 33.024 176.293 33.12 176.101 33.312C175.845 33.568 175.589 33.888 175.333 34.272C175.077 34.592 174.789 34.912 174.469 35.232C174.341 35.36 174.181 35.52 173.989 35.712C173.861 35.84 173.733 36 173.605 36.192L172.741 37.632L171.877 38.304V38.592C171.685 38.784 171.589 38.944 171.589 39.072C171.141 39.456 170.565 40.16 169.861 41.184C169.157 42.144 168.741 42.88 168.613 43.392C167.973 43.712 167.461 44.512 167.077 45.792C166.693 47.072 166.469 48 166.405 48.576C166.341 48.832 166.181 48.992 165.925 49.056C165.733 49.12 165.573 49.152 165.445 49.152Z"
               fill="white" />
            <path
               d="M165.319 23.136C165.063 23.136 164.743 22.976 164.359 22.656C163.975 22.336 163.783 22.048 163.783 21.792C163.783 21.664 164.007 21.376 164.455 20.928C164.903 20.416 165.383 19.936 165.895 19.488C166.471 18.976 166.823 18.656 166.951 18.528C167.463 18.656 167.719 18.944 167.719 19.392C167.719 19.648 167.559 20.096 167.239 20.736C166.983 21.312 166.663 21.856 166.279 22.368C165.959 22.88 165.639 23.136 165.319 23.136ZM155.143 48C154.951 48 154.759 47.936 154.567 47.808C154.439 47.68 154.279 47.584 154.087 47.52C153.639 47.136 153.319 46.816 153.127 46.56C152.935 46.304 152.839 45.856 152.839 45.216C152.839 43.168 153.319 41.216 154.279 39.36C155.239 37.44 156.135 35.616 156.967 33.888C157.095 33.76 157.127 33.632 157.063 33.504C156.999 33.312 156.967 33.152 156.967 33.024C156.967 32.448 157.191 31.808 157.639 31.104C158.151 30.336 158.727 29.6 159.367 28.896C160.007 28.192 160.519 27.68 160.903 27.36C161.287 27.36 161.863 27.424 162.631 27.552C163.399 27.616 163.783 27.904 163.783 28.416C163.783 28.48 163.463 28.864 162.823 29.568C162.183 30.272 161.799 30.72 161.671 30.912C160.839 32.192 159.847 33.728 158.695 35.52C157.607 37.248 156.647 39.04 155.815 40.896C154.983 42.752 154.567 44.512 154.567 46.176C155.335 46.048 156.135 45.6 156.967 44.832C157.863 44 158.535 43.296 158.983 42.72H159.079V42.816C159.079 43.072 158.951 43.328 158.695 43.584C158.439 43.84 158.247 44.064 158.119 44.256C157.863 44.704 157.447 45.44 156.871 46.464C156.359 47.488 155.783 48 155.143 48Z"
               fill="white" />
            <path
               d="M130.489 52.32C130.233 52.192 129.977 51.872 129.721 51.36C129.401 50.912 129.113 50.432 128.857 49.92C128.601 49.472 128.345 49.28 128.089 49.344C128.089 49.088 128.057 48.864 127.993 48.672C127.865 48.48 127.801 48.288 127.801 48.096C129.145 46.24 130.777 44.576 132.697 43.104C134.681 41.632 136.665 40.384 138.649 39.36H138.937C139.385 38.912 139.897 38.528 140.473 38.208C141.113 37.888 141.593 37.504 141.913 37.056V36.96C141.081 36.448 140.185 36 139.225 35.616C138.265 35.232 137.433 34.688 136.729 33.984C136.089 33.472 135.481 32.832 134.905 32.064C134.393 31.296 134.137 30.464 134.137 29.568C134.137 28.16 134.809 26.88 136.153 25.728C137.497 24.512 138.713 23.584 139.801 22.944C140.121 22.56 140.729 22.112 141.625 21.6C142.585 21.088 143.545 20.608 144.505 20.16C145.529 19.648 146.265 19.296 146.713 19.104V19.2C147.161 18.88 147.673 18.656 148.249 18.528L149.401 18.048H149.593C150.105 17.92 150.649 17.792 151.225 17.664C151.801 17.472 152.345 17.376 152.857 17.376C153.433 17.376 154.105 17.696 154.873 18.336C155.641 18.976 156.025 19.616 156.025 20.256C156.025 20.512 155.833 20.992 155.449 21.696C155.129 22.336 154.745 22.944 154.297 23.52C153.913 24.096 153.593 24.448 153.337 24.576C153.273 24.576 153.209 24.608 153.145 24.672C153.145 24.672 153.113 24.672 153.049 24.672V24.48C153.369 24.096 153.657 23.52 153.913 22.752C154.233 21.92 154.393 21.248 154.393 20.736C154.393 19.776 153.881 19.296 152.857 19.296C152.089 19.296 151.353 19.424 150.649 19.68C150.009 19.872 149.337 20.128 148.633 20.448C146.265 21.28 144.185 22.272 142.393 23.424C140.665 24.512 139.065 26.144 137.593 28.32C137.337 28.768 137.049 29.248 136.729 29.76C136.473 30.208 136.345 30.688 136.345 31.2C136.345 31.84 136.569 32.384 137.017 32.832C137.529 33.216 138.041 33.536 138.553 33.792C138.745 33.92 139.225 34.208 139.993 34.656C140.761 35.104 141.497 35.552 142.201 36C142.969 36.384 143.385 36.576 143.449 36.576C143.769 36.576 144.089 36.448 144.409 36.192C144.729 35.936 145.017 35.744 145.273 35.616C146.169 35.104 147.417 34.464 149.017 33.696C150.617 32.864 151.897 32.352 152.857 32.16L154.201 31.872C154.265 31.872 154.361 31.936 154.489 32.064C154.425 32.128 154.329 32.224 154.201 32.352C154.073 32.416 153.945 32.48 153.817 32.544C153.433 32.928 152.793 33.28 151.897 33.6C151.065 33.856 150.489 34.112 150.169 34.368C149.977 34.496 149.817 34.688 149.689 34.944C149.561 35.136 149.401 35.296 149.209 35.424C148.633 35.808 147.897 36.32 147.001 36.96C146.105 37.536 145.657 38.208 145.657 38.976C145.657 39.232 145.689 39.488 145.753 39.744C145.881 40 145.945 40.288 145.945 40.608C145.945 41.12 145.785 41.856 145.465 42.816C145.145 43.712 144.761 44.32 144.313 44.64V45.024C143.737 45.216 143.289 45.632 142.969 46.272C142.713 46.848 142.201 47.104 141.433 47.04L140.953 47.616C140.505 47.616 140.121 47.776 139.801 48.096C139.481 48.48 139.161 48.832 138.841 49.152H138.745C138.297 49.152 137.817 49.344 137.305 49.728C136.857 50.176 136.281 50.56 135.577 50.88C134.937 51.264 134.105 51.36 133.081 51.168C132.825 51.232 132.601 51.328 132.409 51.456C132.217 51.584 131.993 51.648 131.737 51.648C131.545 51.648 131.449 51.584 131.449 51.456C131.449 51.392 131.545 51.264 131.737 51.072C131.993 50.944 132.665 50.624 133.753 50.112C134.841 49.6 135.609 49.216 136.057 48.96C136.057 48.896 136.185 48.768 136.441 48.576C136.761 48.384 136.953 48.256 137.017 48.192C137.849 47.616 138.777 46.88 139.801 45.984C140.825 45.024 141.721 44 142.489 42.912C143.257 41.76 143.641 40.672 143.641 39.648C143.641 39.456 143.609 39.2 143.545 38.88C143.481 38.496 143.321 38.304 143.065 38.304C142.809 38.304 142.553 38.432 142.297 38.688C142.105 38.944 141.945 39.136 141.817 39.264C141.369 39.584 140.889 39.904 140.377 40.224C139.865 40.544 139.353 40.896 138.841 41.28C138.201 41.728 137.625 42.24 137.113 42.816C136.601 43.328 136.025 43.84 135.385 44.352C134.553 44.992 133.785 45.664 133.081 46.368C132.377 47.008 131.673 47.712 130.969 48.48C130.457 48.992 130.201 49.632 130.201 50.4C130.201 50.656 130.265 50.912 130.393 51.168C130.521 51.488 130.585 51.808 130.585 52.128L130.489 52.32Z"
               fill="white" />
            <path
               d="M106.63 46.944C105.734 46.944 104.742 46.464 103.654 45.504C102.566 44.48 102.022 43.488 102.022 42.528H101.926C101.99 42.272 102.054 41.664 102.118 40.704C102.182 39.744 102.342 39.232 102.598 39.168V38.976C102.662 38.912 102.822 38.656 103.078 38.208C103.334 37.76 103.59 37.28 103.846 36.768C104.166 36.256 104.358 35.936 104.422 35.808C104.614 35.488 105.126 34.88 105.958 33.984C106.79 33.024 107.654 32.128 108.55 31.296C109.446 30.464 110.022 30.048 110.278 30.048C110.662 29.472 111.366 28.832 112.39 28.128C113.478 27.424 114.566 26.752 115.654 26.112C116.806 25.472 117.606 25.024 118.054 24.768V24.672L118.15 24.768H118.246C118.502 24.512 118.982 24.256 119.686 24C120.454 23.68 120.966 23.488 121.222 23.424C121.67 23.232 122.118 23.104 122.566 23.04C123.014 22.976 123.462 22.912 123.91 22.848C124.23 22.912 124.55 22.944 124.87 22.944C125.254 22.944 125.606 22.976 125.926 23.04C126.566 23.168 127.27 23.52 128.038 24.096C128.806 24.608 129.19 25.248 129.19 26.016C129.126 26.08 129.062 26.176 128.998 26.304C128.934 26.432 128.934 26.528 128.998 26.592L128.614 26.4C128.23 25.696 127.654 25.28 126.886 25.152C126.118 24.96 125.382 24.864 124.678 24.864C122.95 24.864 121.126 25.312 119.206 26.208C117.286 27.04 115.398 28.16 113.542 29.568C111.686 30.976 110.022 32.48 108.55 34.08C107.142 35.68 106.086 37.216 105.382 38.688L105.094 39.84C104.966 40.48 104.774 41.088 104.518 41.664C104.262 42.24 104.134 42.88 104.134 43.584C104.134 44.096 104.198 44.48 104.326 44.736C104.454 44.928 104.678 45.248 104.998 45.696L105.19 45.6V45.696L105.382 45.504L105.766 45.6C106.214 45.344 106.694 45.152 107.206 45.024C107.718 44.832 108.134 44.576 108.454 44.256L108.646 44.064C109.03 43.936 109.382 43.712 109.702 43.392C110.022 43.072 110.31 42.784 110.566 42.528C111.526 41.632 112.486 40.736 113.446 39.84C114.406 38.944 115.302 38.016 116.134 37.056C116.582 36.544 117.158 35.904 117.862 35.136C118.566 34.368 119.174 33.824 119.686 33.504L119.782 33.12C120.294 32.928 120.774 32.48 121.222 31.776C121.734 31.072 122.214 30.4 122.662 29.76C123.174 29.056 123.654 28.704 124.102 28.704L124.486 28.608C124.998 28.608 125.414 28.832 125.734 29.28C126.054 29.664 126.214 30.08 126.214 30.528C126.214 31.04 126.054 31.616 125.734 32.256C125.414 32.896 125.19 33.472 125.062 33.984C124.742 35.328 124.518 36.544 124.39 37.632C124.262 38.656 124.198 39.84 124.198 41.184C124.198 42.016 124.326 42.72 124.582 43.296C124.902 43.872 125.35 44.48 125.926 45.12H126.406C127.302 44.608 127.942 44.064 128.326 43.488C128.71 42.912 129.19 42.304 129.766 41.664C129.83 41.664 129.894 41.632 129.958 41.568C130.022 41.504 130.054 41.472 130.054 41.472C130.182 41.472 130.246 41.536 130.246 41.664C130.246 41.92 130.182 42.176 130.054 42.432C129.99 42.624 129.926 42.88 129.862 43.2C129.734 43.904 129.542 44.576 129.286 45.216C129.094 45.792 128.486 46.08 127.462 46.08C126.886 46.08 126.246 45.952 125.542 45.696C124.838 45.44 124.262 45.088 123.814 44.64C122.854 43.552 122.246 42.368 121.99 41.088C121.798 39.744 121.702 38.368 121.702 36.96V33.888H121.51C121.254 34.272 120.966 34.656 120.646 35.04C120.326 35.424 120.006 35.808 119.686 36.192C119.43 36.448 119.11 36.736 118.726 37.056C118.406 37.312 118.118 37.632 117.862 38.016C117.734 38.016 117.478 38.24 117.094 38.688C116.774 39.072 116.614 39.36 116.614 39.552C116.166 39.616 115.654 40 115.078 40.704C114.566 41.408 114.214 41.76 114.022 41.76C113.958 41.952 113.734 42.272 113.35 42.72C112.966 43.104 112.678 43.392 112.486 43.584C112.038 43.648 111.654 43.872 111.334 44.256C111.078 44.64 110.822 44.992 110.566 45.312C109.99 45.568 109.35 45.92 108.646 46.368C107.942 46.752 107.27 46.944 106.63 46.944Z"
               fill="white" />
            <path
               d="M81.3262 48.864C80.9422 48.864 80.5582 48.736 80.1742 48.48C79.7902 48.288 79.5342 47.968 79.4062 47.52C79.4062 47.456 79.4062 47.296 79.4062 47.04C79.4702 46.848 79.5342 46.752 79.5982 46.752L84.2062 35.904C84.6542 34.816 85.1342 33.536 85.6462 32.064C86.1582 30.528 86.5422 29.024 86.7982 27.552C87.1182 26.016 87.2143 24.704 87.0863 23.616C86.7023 23.616 86.2862 23.68 85.8382 23.808C85.3902 23.936 84.9742 24 84.5902 24C84.4622 24 84.3982 23.904 84.3982 23.712C84.3982 23.52 84.4622 23.328 84.5902 23.136C84.7822 22.88 85.1022 22.784 85.5502 22.848C85.6782 22.912 85.9662 22.944 86.4142 22.944C87.1822 22.944 88.0462 22.976 89.0062 23.04C89.9662 23.04 90.4782 23.456 90.5422 24.288C90.5422 24.608 90.3182 25.344 89.8702 26.496C89.4862 27.648 88.9742 28.96 88.3342 30.432C87.7582 31.904 87.2142 33.312 86.7022 34.656C86.1902 35.936 85.8382 36.896 85.6462 37.536C85.3262 38.176 85.1662 38.624 85.1662 38.88H85.4542C85.9662 38.048 86.5422 37.312 87.1822 36.672C87.8862 35.968 88.4942 35.2 89.0062 34.368C89.3902 34.112 89.9662 33.504 90.7342 32.544C91.5022 31.52 92.3022 30.496 93.1342 29.472C94.0302 28.384 94.8622 27.616 95.6302 27.168C95.7582 27.104 96.0462 26.944 96.4942 26.688C96.9422 26.368 97.1982 26.176 97.2622 26.112C97.4542 26.112 97.6462 26.112 97.8382 26.112C98.0942 26.048 98.3182 26.016 98.5102 26.016C98.7022 26.016 98.8623 26.048 98.9902 26.112C99.1823 26.112 99.3742 26.112 99.5662 26.112C99.7582 26.112 100.174 26.272 100.814 26.592C101.454 26.848 102.062 27.168 102.638 27.552C103.214 27.872 103.502 28.128 103.502 28.32C103.502 28.896 103.278 29.344 102.83 29.664C102.382 29.92 101.998 30.208 101.678 30.528C101.23 31.104 100.718 31.744 100.142 32.448C99.6302 33.088 99.3103 33.792 99.1823 34.56L99.0863 35.04L98.9902 35.136C98.9902 35.136 98.9582 35.104 98.8942 35.04C98.8942 34.976 98.8622 34.944 98.7982 34.944L98.7022 35.04C98.7022 33.76 99.0222 32.544 99.6622 31.392C100.302 30.176 100.622 28.96 100.622 27.744C100.622 27.424 100.494 27.264 100.238 27.264C99.7902 27.264 99.1822 27.552 98.4142 28.128C97.6462 28.64 96.9422 29.184 96.3022 29.76C95.6622 30.272 95.2782 30.528 95.1502 30.528C95.0222 30.784 94.6382 31.2 93.9982 31.776C93.4222 32.352 93.0062 32.736 92.7502 32.928C92.3022 33.312 91.8863 33.76 91.5023 34.272C91.1823 34.784 90.8303 35.296 90.4463 35.808C90.3823 35.872 90.2542 35.968 90.0622 36.096C89.8702 36.224 89.7102 36.352 89.5822 36.48C89.3262 36.928 89.0062 37.344 88.6222 37.728C88.4942 37.984 88.3662 38.24 88.2382 38.496C88.1742 38.752 88.0142 39.008 87.7582 39.264L87.2782 39.36C87.0222 39.872 86.7022 40.352 86.3182 40.8C85.9342 41.184 85.5822 41.6 85.2622 42.048C85.0062 42.496 84.7822 42.976 84.5902 43.488C84.4622 44 84.2382 44.448 83.9182 44.832C83.5342 45.344 83.1183 45.952 82.6702 46.656C82.2862 47.296 82.0942 47.968 82.0942 48.672H81.9982C81.7422 48.8 81.5182 48.864 81.3262 48.864Z"
               fill="white" />
            <path
               d="M65.9145 47.52C64.3145 47.52 62.7145 47.008 61.1145 45.984C59.5145 44.96 58.7145 43.552 58.7145 41.76C58.7145 41.44 58.7145 41.12 58.7145 40.8C58.7785 40.48 58.8105 40.192 58.8105 39.936C58.8105 39.552 58.5225 39.232 57.9465 38.976C57.3705 38.656 57.0825 38.304 57.0825 37.92C57.1465 37.856 57.2425 37.824 57.3705 37.824C57.6265 37.824 57.8825 37.888 58.1385 38.016C58.3945 38.08 58.6505 38.112 58.9065 38.112C59.0985 38.112 59.3225 38.048 59.5785 37.92C59.7065 37.792 59.9625 37.216 60.3465 36.192C60.7945 35.168 61.4345 33.92 62.2665 32.448C63.0985 30.976 64.1545 29.568 65.4345 28.224C66.7145 26.816 68.2505 25.728 70.0425 24.96C70.4265 24.832 70.8105 24.704 71.1945 24.576C71.6425 24.384 72.0585 24.288 72.4425 24.288C73.1465 24.288 73.8825 24.576 74.6505 25.152C75.4825 25.664 75.8985 26.304 75.8985 27.072C75.8985 27.52 75.8025 27.936 75.6105 28.32C75.4185 28.64 75.2265 28.992 75.0345 29.376L74.5545 29.664C74.3625 29.984 74.0105 30.432 73.4985 31.008C73.0505 31.52 72.8265 31.904 72.8265 32.16C72.8265 32.16 72.7945 32.16 72.7305 32.16C72.7305 32.16 72.7305 32.192 72.7305 32.256L72.3465 32.352C71.9625 32.608 71.6425 32.928 71.3865 33.312C71.1305 33.696 70.8425 33.984 70.5225 34.176C69.3065 35.008 68.0905 35.808 66.8745 36.576C65.7225 37.344 64.4745 38.048 63.1305 38.688C62.8745 38.816 62.5865 38.912 62.2665 38.976C61.9465 39.04 61.6905 39.2 61.4985 39.456C61.2425 39.84 61.0505 40.288 60.9225 40.8C60.8585 41.312 60.8265 41.824 60.8265 42.336C60.8265 43.104 61.0185 43.968 61.4025 44.928C61.7865 45.824 62.4585 46.272 63.4185 46.272C63.5465 46.272 63.6425 46.272 63.7065 46.272C63.8345 46.208 63.9305 46.176 63.9945 46.176C64.3785 46.176 64.7305 46.144 65.0505 46.08C65.4345 46.016 65.8185 45.952 66.2025 45.888L66.7785 45.6H66.8745C67.1945 45.6 67.8025 45.376 68.6985 44.928C69.6585 44.416 70.5865 43.904 71.4825 43.392C72.3785 42.816 72.9225 42.432 73.1145 42.24C73.2425 42.176 73.3385 42.08 73.4025 41.952C73.5305 41.824 73.6265 41.728 73.6905 41.664C74.7785 40.832 75.8985 40.032 77.0505 39.264C78.2025 38.496 79.2905 37.6 80.3145 36.576V36.672H80.5065C80.4425 36.992 80.1865 37.312 79.7385 37.632C79.3545 37.952 79.0665 38.272 78.8745 38.592C78.1705 39.872 77.0505 41.088 75.5145 42.24C73.9785 43.392 72.5705 44.384 71.2905 45.216C70.8425 45.536 70.3945 45.888 69.9465 46.272C69.5625 46.592 69.1145 46.848 68.6025 47.04C67.6425 47.36 66.7465 47.52 65.9145 47.52ZM62.1705 36.96C62.6825 36.96 63.1625 36.768 63.6105 36.384C64.1225 35.936 64.5065 35.68 64.7625 35.616L64.8585 35.712V35.616C66.0745 35.04 67.2265 34.24 68.3145 33.216C69.4665 32.192 70.5225 31.2 71.4825 30.24H71.6745C71.6745 29.856 71.9625 29.44 72.5385 28.992C73.1145 28.48 73.4025 28.064 73.4025 27.744C73.5305 27.616 73.6585 27.424 73.7865 27.168C73.9145 26.848 73.9785 26.624 73.9785 26.496C73.7865 26.368 73.4985 26.304 73.1145 26.304C72.7945 26.432 72.3785 26.656 71.8665 26.976C71.3545 27.296 70.9065 27.456 70.5225 27.456C70.5225 27.52 70.2025 27.776 69.5625 28.224C68.9865 28.672 68.3785 29.152 67.7385 29.664C67.0985 30.176 66.6825 30.528 66.4905 30.72C66.1705 31.04 65.6585 31.616 64.9545 32.448C64.2505 33.28 63.6105 34.112 63.0345 34.944C62.4585 35.776 62.1705 36.416 62.1705 36.864V36.96Z"
               fill="white" />
            <path
               d="M44.0707 47.52C42.4707 47.52 40.8707 47.008 39.2707 45.984C37.6707 44.96 36.8707 43.552 36.8707 41.76C36.8707 41.44 36.8707 41.12 36.8707 40.8C36.9347 40.48 36.9667 40.192 36.9667 39.936C36.9667 39.552 36.6787 39.232 36.1027 38.976C35.5267 38.656 35.2387 38.304 35.2387 37.92C35.3027 37.856 35.3987 37.824 35.5267 37.824C35.7827 37.824 36.0387 37.888 36.2947 38.016C36.5507 38.08 36.8067 38.112 37.0627 38.112C37.2547 38.112 37.4787 38.048 37.7347 37.92C37.8627 37.792 38.1187 37.216 38.5027 36.192C38.9507 35.168 39.5907 33.92 40.4227 32.448C41.2547 30.976 42.3107 29.568 43.5907 28.224C44.8707 26.816 46.4067 25.728 48.1987 24.96C48.5827 24.832 48.9667 24.704 49.3507 24.576C49.7987 24.384 50.2147 24.288 50.5987 24.288C51.3027 24.288 52.0387 24.576 52.8067 25.152C53.6387 25.664 54.0547 26.304 54.0547 27.072C54.0547 27.52 53.9587 27.936 53.7667 28.32C53.5747 28.64 53.3827 28.992 53.1907 29.376L52.7107 29.664C52.5187 29.984 52.1667 30.432 51.6547 31.008C51.2067 31.52 50.9827 31.904 50.9827 32.16C50.9827 32.16 50.9507 32.16 50.8867 32.16C50.8867 32.16 50.8867 32.192 50.8867 32.256L50.5027 32.352C50.1187 32.608 49.7987 32.928 49.5427 33.312C49.2867 33.696 48.9987 33.984 48.6787 34.176C47.4627 35.008 46.2467 35.808 45.0307 36.576C43.8787 37.344 42.6307 38.048 41.2867 38.688C41.0307 38.816 40.7427 38.912 40.4227 38.976C40.1027 39.04 39.8467 39.2 39.6547 39.456C39.3987 39.84 39.2067 40.288 39.0787 40.8C39.0147 41.312 38.9827 41.824 38.9827 42.336C38.9827 43.104 39.1747 43.968 39.5587 44.928C39.9427 45.824 40.6147 46.272 41.5747 46.272C41.7027 46.272 41.7987 46.272 41.8627 46.272C41.9907 46.208 42.0867 46.176 42.1507 46.176C42.5347 46.176 42.8867 46.144 43.2067 46.08C43.5907 46.016 43.9747 45.952 44.3587 45.888L44.9347 45.6H45.0307C45.3507 45.6 45.9587 45.376 46.8547 44.928C47.8147 44.416 48.7427 43.904 49.6387 43.392C50.5347 42.816 51.0787 42.432 51.2707 42.24C51.3987 42.176 51.4947 42.08 51.5587 41.952C51.6867 41.824 51.7827 41.728 51.8467 41.664C52.9347 40.832 54.0547 40.032 55.2067 39.264C56.3587 38.496 57.4467 37.6 58.4707 36.576V36.672H58.6627C58.5987 36.992 58.3427 37.312 57.8947 37.632C57.5107 37.952 57.2227 38.272 57.0307 38.592C56.3267 39.872 55.2067 41.088 53.6707 42.24C52.1347 43.392 50.7267 44.384 49.4467 45.216C48.9987 45.536 48.5507 45.888 48.1027 46.272C47.7187 46.592 47.2707 46.848 46.7587 47.04C45.7987 47.36 44.9027 47.52 44.0707 47.52ZM40.3267 36.96C40.8387 36.96 41.3187 36.768 41.7667 36.384C42.2787 35.936 42.6627 35.68 42.9187 35.616L43.0147 35.712V35.616C44.2307 35.04 45.3827 34.24 46.4707 33.216C47.6227 32.192 48.6787 31.2 49.6387 30.24H49.8307C49.8307 29.856 50.1187 29.44 50.6947 28.992C51.2707 28.48 51.5587 28.064 51.5587 27.744C51.6867 27.616 51.8147 27.424 51.9427 27.168C52.0707 26.848 52.1347 26.624 52.1347 26.496C51.9427 26.368 51.6547 26.304 51.2707 26.304C50.9507 26.432 50.5347 26.656 50.0227 26.976C49.5107 27.296 49.0627 27.456 48.6787 27.456C48.6787 27.52 48.3587 27.776 47.7187 28.224C47.1427 28.672 46.5347 29.152 45.8947 29.664C45.2547 30.176 44.8387 30.528 44.6467 30.72C44.3267 31.04 43.8147 31.616 43.1107 32.448C42.4067 33.28 41.7667 34.112 41.1907 34.944C40.6147 35.776 40.3267 36.416 40.3267 36.864V36.96Z"
               fill="white" />
            <path
               d="M15.456 49.152C15.264 49.152 15.168 48.992 15.168 48.672C15.168 48.352 15.264 47.776 15.456 46.944C15.712 46.112 15.968 45.28 16.224 44.448C16.544 43.552 16.768 42.912 16.896 42.528C17.984 39.136 19.168 35.488 20.448 31.584C21.728 27.616 22.816 23.648 23.712 19.68C24.672 15.712 25.152 12 25.152 8.544C25.152 7.328 25.024 6.176 24.768 5.088C24.576 3.936 24.128 2.976 23.424 2.208C22.784 1.44 21.728 1.056 20.256 1.056C17.888 1.056 15.68 1.792 13.632 3.264C11.584 4.672 9.792 6.432 8.256 8.544C6.784 10.592 5.6 12.608 4.704 14.592C4.064 16 3.424 17.472 2.784 19.008C2.208 20.544 1.92 22.144 1.92 23.808C1.92 25.088 2.208 26.464 2.784 27.936C3.36 29.344 4.256 30.368 5.472 31.008C5.728 31.008 5.856 31.104 5.856 31.296H5.952V31.488C4.608 31.36 3.488 30.816 2.592 29.856C1.696 28.896 1.024 27.744 0.576 26.4C0.192 25.056 0 23.808 0 22.656C0 20.736 0.352 18.72 1.056 16.608C1.824 14.432 2.784 12.384 3.936 10.464C5.152 8.48 6.4 6.816 7.68 5.472C8.192 4.896 8.768 4.416 9.408 4.032C10.112 3.584 10.784 3.136 11.424 2.688C12.064 2.24 12.736 1.824 13.44 1.44C14.144 1.056 14.912 0.767998 15.744 0.575998C15.936 0.511999 16.16 0.48 16.416 0.48C16.672 0.48 16.896 0.448 17.088 0.383999C17.28 0.32 17.472 0.255999 17.664 0.191998C17.856 0.127998 18.048 0.0639992 18.24 0C19.52 0.255999 20.736 0.511997 21.888 0.767998C23.104 0.959997 24.192 1.568 25.152 2.592C26.176 3.616 26.848 4.832 27.168 6.24C27.552 7.648 27.744 9.056 27.744 10.464C27.744 13.792 27.2 17.088 26.112 20.352C25.088 23.552 24.032 26.72 22.944 29.856C22.688 30.56 22.464 31.328 22.272 32.16C22.144 32.928 21.92 33.664 21.6 34.368C21.024 35.712 20.512 36.992 20.064 38.208C19.68 39.424 19.232 40.768 18.72 42.24C18.656 42.496 18.496 42.752 18.24 43.008C18.048 43.2 17.888 43.424 17.76 43.68C17.44 44.256 17.088 44.96 16.704 45.792C16.384 46.624 16.128 47.392 15.936 48.096C15.872 48.288 15.84 48.512 15.84 48.768C15.904 49.024 15.776 49.152 15.456 49.152ZM18.432 51.168C18.048 51.168 17.664 51.072 17.28 50.88C16.96 50.688 16.8 50.368 16.8 49.92C16.8 49.6 16.928 49.088 17.184 48.384C17.44 47.744 17.6 47.296 17.664 47.04C18.176 45.76 18.752 44.576 19.392 43.488C20.096 42.336 20.768 41.184 21.408 40.032C21.728 39.584 22.016 39.168 22.272 38.784C22.592 38.336 22.848 37.888 23.04 37.44C23.168 37.12 23.296 36.8 23.424 36.48C23.552 36.16 23.712 35.872 23.904 35.616C24.416 34.72 24.96 33.888 25.536 33.12C26.112 32.288 26.656 31.456 27.168 30.624C27.488 30.112 28.064 29.216 28.896 27.936C29.728 26.656 30.56 25.44 31.392 24.288C32.288 23.136 32.896 22.464 33.216 22.272C33.344 22.272 33.408 22.208 33.408 22.08H33.312C33.824 20.992 34.528 20 35.424 19.104C36.32 18.208 37.184 17.344 38.016 16.512C40.064 14.464 41.92 12.736 43.584 11.328C45.248 9.92 47.488 8.768 50.304 7.872C51.648 8 52.832 8.416 53.856 9.12C54.88 9.824 55.392 10.944 55.392 12.48C55.392 13.248 55.296 13.92 55.104 14.496C54.848 15.136 54.56 15.808 54.24 16.512C53.92 17.216 53.6 17.888 53.28 18.528C53.024 18.912 52.768 19.104 52.512 19.104V18.912L52.608 18.816C52.928 17.792 53.152 16.8 53.28 15.84C53.472 14.816 53.568 13.792 53.568 12.768C53.568 12.064 53.44 11.296 53.184 10.464C52.992 9.632 52.448 9.216 51.552 9.216C51.232 9.216 50.688 9.344 49.92 9.6C49.152 9.856 48.768 10.176 48.768 10.56C48 10.56 47.008 11.008 45.792 11.904C44.64 12.8 43.392 13.888 42.048 15.168C40.768 16.448 39.616 17.696 38.592 18.912C37.568 20.128 36.864 21.056 36.48 21.696C36.416 21.76 36.352 21.856 36.288 21.984C36.288 22.048 36.224 22.08 36.096 22.08C35.968 22.208 35.808 22.464 35.616 22.848C35.424 23.168 35.296 23.392 35.232 23.52C35.04 23.648 34.784 23.904 34.464 24.288C34.144 24.672 33.984 24.992 33.984 25.248C33.984 25.376 34.08 25.44 34.272 25.44L34.08 25.536C33.568 25.92 33.12 26.304 32.736 26.688C32.416 27.072 32.192 27.616 32.064 28.32C32 28.384 31.968 28.48 31.968 28.608C32.032 28.672 32 28.736 31.872 28.8V28.896C31.552 28.96 31.008 29.472 30.24 30.432C29.472 31.392 28.64 32.512 27.744 33.792C26.912 35.072 26.144 36.256 25.44 37.344C24.8 38.432 24.384 39.168 24.192 39.552C24 40 23.808 40.448 23.616 40.896C23.488 41.28 23.296 41.696 23.04 42.144C22.784 42.656 22.368 43.264 21.792 43.968C21.536 44.416 21.312 45.216 21.12 46.368C20.992 47.52 20.736 48.608 20.352 49.632C19.968 50.656 19.328 51.168 18.432 51.168Z"
               fill="white" />
         </svg>


      </div>
   )
}

export default Preloader