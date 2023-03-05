import { fireEvent, screen } from '@testing-library/react';
import { renderWithTranslation } from '../../../shared/lib/tests/renderWithTranslation/renderWithTranslation';
import { Sidebar } from './Sidebar';

describe('Sidebar', () => {
    test('Test render', () => {
        renderWithTranslation(<Sidebar />);
        expect(screen.getByTestId('side_id')).toBeInTheDocument();
    });
    test('Test toggle', () => {
        renderWithTranslation(<Sidebar />);
        const toggleBtn = screen.getByTestId('sidebar-toggle');
        expect(screen.getByTestId('side_id')).toBeInTheDocument();
        fireEvent.click(toggleBtn);
        expect(screen.getByTestId('side_id')).toHaveClass('collapsed');
    });
});
