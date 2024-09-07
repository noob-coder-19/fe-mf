import { Link } from "react-router";

export function Logo() {
  return (
    <Link
      to="/"
      className="flex flex-1 gap-2 items-center justify-between focus:none focus:outline-none hover:opacity-90 disabled:opacity-80 disabled:hover:opacity-80"
    >
      <svg
        width="42"
        height="27"
        viewBox="0 0 84 54"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 17C2 -3 42 -3 42 17C42 37 82 37 82 17"
          stroke="#00CC88"
          strokeWidth="4"
        />
        <path
          d="M2 37C2 57 42 57 42 37C42 17 82 17 82 37"
          stroke="#F4B400"
          strokeWidth="4"
        />
        <path
          d="M42 32C44.7614 32 47 29.7614 47 27C47 24.2386 44.7614 22 42 22C39.2386 22 37 24.2386 37 27C37 29.7614 39.2386 32 42 32Z"
          fill="#00CC88"
        />
      </svg>

      <svg
        width="106"
        height="16"
        viewBox="0 0 106 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.66 15V0.999999H3.34L9.3 10.88H7.88L13.74 0.999999H16.4L16.44 15H13.4L13.38 5.66H13.94L9.26 13.52H7.8L3.02 5.66H3.7V15H0.66ZM26.3416 15V12.9L26.1416 12.44V8.68C26.1416 8.01333 25.9349 7.49333 25.5216 7.12C25.1216 6.74667 24.5016 6.56 23.6616 6.56C23.0882 6.56 22.5216 6.65333 21.9616 6.84C21.4149 7.01333 20.9482 7.25333 20.5616 7.56L19.4416 5.38C20.0282 4.96667 20.7349 4.64667 21.5616 4.42C22.3882 4.19333 23.2282 4.08 24.0816 4.08C25.7216 4.08 26.9949 4.46667 27.9016 5.24C28.8082 6.01333 29.2616 7.22 29.2616 8.86V15H26.3416ZM23.0616 15.16C22.2216 15.16 21.5016 15.02 20.9016 14.74C20.3016 14.4467 19.8416 14.0533 19.5216 13.56C19.2016 13.0667 19.0416 12.5133 19.0416 11.9C19.0416 11.26 19.1949 10.7 19.5016 10.22C19.8216 9.74 20.3216 9.36667 21.0016 9.1C21.6816 8.82 22.5682 8.68 23.6616 8.68H26.5216V10.5H24.0016C23.2682 10.5 22.7616 10.62 22.4816 10.86C22.2149 11.1 22.0816 11.4 22.0816 11.76C22.0816 12.16 22.2349 12.48 22.5416 12.72C22.8616 12.9467 23.2949 13.06 23.8416 13.06C24.3616 13.06 24.8282 12.94 25.2416 12.7C25.6549 12.4467 25.9549 12.08 26.1416 11.6L26.6216 13.04C26.3949 13.7333 25.9816 14.26 25.3816 14.62C24.7816 14.98 24.0082 15.16 23.0616 15.16ZM32.2853 15V4.24H35.2653V7.28L34.8453 6.4C35.1653 5.64 35.6786 5.06667 36.3853 4.68C37.092 4.28 37.952 4.08 38.9653 4.08V6.96C38.832 6.94667 38.712 6.94 38.6053 6.94C38.4986 6.92667 38.3853 6.92 38.2653 6.92C37.412 6.92 36.7186 7.16667 36.1853 7.66C35.6653 8.14 35.4053 8.89333 35.4053 9.92V15H32.2853ZM43.6005 12.8L43.6805 9L48.7005 4.24H52.4205L47.6005 9.14L45.9805 10.46L43.6005 12.8ZM41.0205 15V0.159999H44.1405V15H41.0205ZM49.0405 15L45.4005 10.48L47.3605 8.06L52.8205 15H49.0405ZM59.2948 15.16C58.0682 15.16 56.9882 14.92 56.0548 14.44C55.1348 13.96 54.4215 13.3067 53.9148 12.48C53.4082 11.64 53.1548 10.6867 53.1548 9.62C53.1548 8.54 53.4015 7.58667 53.8948 6.76C54.4015 5.92 55.0882 5.26667 55.9548 4.8C56.8215 4.32 57.8015 4.08 58.8948 4.08C59.9482 4.08 60.8948 4.30667 61.7348 4.76C62.5882 5.2 63.2615 5.84 63.7548 6.68C64.2482 7.50667 64.4948 8.5 64.4948 9.66C64.4948 9.78 64.4882 9.92 64.4748 10.08C64.4615 10.2267 64.4482 10.3667 64.4348 10.5H55.6948V8.68H62.7948L61.5948 9.22C61.5948 8.66 61.4815 8.17333 61.2548 7.76C61.0282 7.34667 60.7148 7.02667 60.3148 6.8C59.9148 6.56 59.4482 6.44 58.9148 6.44C58.3815 6.44 57.9082 6.56 57.4948 6.8C57.0948 7.02667 56.7815 7.35333 56.5548 7.78C56.3282 8.19333 56.2148 8.68667 56.2148 9.26V9.74C56.2148 10.3267 56.3415 10.8467 56.5948 11.3C56.8615 11.74 57.2282 12.08 57.6948 12.32C58.1748 12.5467 58.7348 12.66 59.3748 12.66C59.9482 12.66 60.4482 12.5733 60.8748 12.4C61.3148 12.2267 61.7148 11.9667 62.0748 11.62L63.7348 13.42C63.2415 13.98 62.6215 14.4133 61.8748 14.72C61.1282 15.0133 60.2682 15.16 59.2948 15.16ZM71.172 15.16C69.9054 15.16 68.9187 14.84 68.212 14.2C67.5054 13.5467 67.152 12.58 67.152 11.3V1.86H70.272V11.26C70.272 11.7133 70.392 12.0667 70.632 12.32C70.872 12.56 71.1987 12.68 71.612 12.68C72.1054 12.68 72.5254 12.5467 72.872 12.28L73.712 14.48C73.392 14.7067 73.0054 14.88 72.552 15C72.112 15.1067 71.652 15.16 71.172 15.16ZM65.492 6.88V4.48H72.952V6.88H65.492ZM78.8834 7.3H85.6034V9.9H78.8834V7.3ZM79.1234 15H75.8834V0.999999H86.4634V3.6H79.1234V15ZM88.6369 15V0.159999H91.7569V15H88.6369ZM99.9725 15.16C98.8258 15.16 97.8058 14.92 96.9125 14.44C96.0325 13.96 95.3325 13.3067 94.8125 12.48C94.3058 11.64 94.0525 10.6867 94.0525 9.62C94.0525 8.54 94.3058 7.58667 94.8125 6.76C95.3325 5.92 96.0325 5.26667 96.9125 4.8C97.8058 4.32 98.8258 4.08 99.9725 4.08C101.106 4.08 102.119 4.32 103.012 4.8C103.906 5.26667 104.606 5.91333 105.112 6.74C105.619 7.56667 105.872 8.52667 105.872 9.62C105.872 10.6867 105.619 11.64 105.112 12.48C104.606 13.3067 103.906 13.96 103.012 14.44C102.119 14.92 101.106 15.16 99.9725 15.16ZM99.9725 12.6C100.492 12.6 100.959 12.48 101.372 12.24C101.786 12 102.112 11.66 102.352 11.22C102.592 10.7667 102.712 10.2333 102.712 9.62C102.712 8.99333 102.592 8.46 102.352 8.02C102.112 7.58 101.786 7.24 101.372 7C100.959 6.76 100.492 6.64 99.9725 6.64C99.4525 6.64 98.9858 6.76 98.5725 7C98.1592 7.24 97.8258 7.58 97.5725 8.02C97.3325 8.46 97.2125 8.99333 97.2125 9.62C97.2125 10.2333 97.3325 10.7667 97.5725 11.22C97.8258 11.66 98.1592 12 98.5725 12.24C98.9858 12.48 99.4525 12.6 99.9725 12.6Z"
          fill="white"
        />
      </svg>
    </Link>
  );
}
