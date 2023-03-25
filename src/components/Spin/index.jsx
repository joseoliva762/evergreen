import './styles.scss';

export const Spin = ({ fill, stroke }) => {
  return (
    <svg className="spin" fill="none" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15.165 8.53a.5.5 0 0 1-.404.58A7 7 0 1 0 23 16a.5.5 0 0 1 1 0 8 8 0 1 1-9.416-7.874.5.5 0 0 1 .58.404z"
        fill={fill || '#000'}
        stroke={stroke || '4'}
      />
    </svg>
  );
};
