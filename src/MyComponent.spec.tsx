import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import MyComponent from './MyComponent';

const mockReplace = jest.fn();
const mockPathname = jest.fn();
Object.defineProperty(window, 'location', {
  value: {
    get pathname() {
      return mockPathname();
    },
    replace: mockReplace
  },
});

const spyWindowOpen = jest.spyOn(window, 'open').mockImplementation(jest.fn());

describe('Testing component', () => {
  it('should open new window on specific paths', async () => {
    render(<MyComponent />);
    const button = screen.getByRole('button');

    mockPathname.mockReturnValue('some');
    await userEvent.click(button);
    expect(spyWindowOpen).toHaveBeenCalledTimes(1);

    mockPathname.mockReturnValue('pathname');
    await userEvent.click(button);
    expect(spyWindowOpen).toHaveBeenCalledTimes(2);

    mockPathname.mockReturnValue('values');
    await userEvent.click(button);
    expect(spyWindowOpen).toHaveBeenCalledTimes(3);
  });

  it('should replace the path on unknown paths', async () => {
    render(<MyComponent />);
    const button = screen.getByRole('button');
    
    mockPathname.mockReturnValue("some incorrect path");
    await userEvent.click(button);
    expect(spyWindowOpen).not.toHaveBeenCalled();
    expect(mockReplace).toHaveBeenCalledTimes(1);
    expect(mockReplace).toHaveBeenCalledWith("some url")
  });
});
