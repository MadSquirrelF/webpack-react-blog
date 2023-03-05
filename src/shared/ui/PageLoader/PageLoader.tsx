import { classNames } from 'shared/lib/classNames/classNames';
import { Loader } from '../Loader/Loader';
import style from './PageLoader.module.scss';

interface PageLoaderProps {
  className?: string;
}
const PageLoader = ({ className }: PageLoaderProps) => (
    <div className={classNames(style.PageLoader, {}, [className])}>
        <Loader />
    </div>
);

export default PageLoader;
