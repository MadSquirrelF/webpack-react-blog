import { fireEvent, screen } from '@testing-library/react';
import { componentRender } from '../../../shared/lib/tests/componentRender/componentRender';
import { Sidebar } from './Sidebar';

describe('Sidebar', () => {
    test('Test render', () => {
        componentRender(<Sidebar />);
        expect(screen.getByTestId('side_id')).toBeInTheDocument();
    });
    test('Test toggle', () => {
        componentRender(<Sidebar />);
        const toggleBtn = screen.getByTestId('sidebar-toggle');
        expect(screen.getByTestId('side_id')).toBeInTheDocument();
        fireEvent.click(toggleBtn);
        expect(screen.getByTestId('side_id')).toHaveClass('Sidebar');
        fireEvent.click(toggleBtn);
        expect(screen.getByTestId('side_id')).toHaveClass('collapsed');
    });
});
