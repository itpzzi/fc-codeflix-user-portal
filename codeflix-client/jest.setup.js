import { resetMocks } from 'jest-fetch-mock'

beforeEach(() => {
  resetMocks();
});

jest.mock('next/image', () => {
  const MockedImage = ({ src, alt, ...props }) => (
    <img
      src={typeof src === 'string' ? src : ''}
      alt={alt}
      {...props}
    />
  );
  MockedImage.displayName = 'MockedNextImage';
  return {
    __esModule: true,
    default: MockedImage,
  };
});