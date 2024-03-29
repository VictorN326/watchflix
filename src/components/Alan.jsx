import { useEffect, useContext } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import { ColorModeContext } from '../utilities/DarkAndLightMode';
import { fetchToken } from '../utilities';
import { selectGenreOrCategory, searchMovie } from '../features/currentGenreOrCategory';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const useAlan = () => {
  const {setMode} = useContext(ColorModeContext);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    alanBtn({
        key: 'd4e915e1bd4c351fea37b9d1e7f66fcc2e956eca572e1d8b807a3e2338fdd0dc/stage',
        onCommand: ({command, mode, genres, genreOrCategory, query}) => {
          if(command === 'chooseGenre') {
            const foundGenre = genres.find((g) => g.name.toLowerCase() === genreOrCategory.toLowerCase());
            if(foundGenre) {
              history.push('/');
              dispatch(selectGenreOrCategory(foundGenre.id));
            } else {
              const category = genreOrCategory.startsWith('top') ? 'top_rated': genreOrCategory;
              history.push('/');
              dispatch(selectGenreOrCategory(category));
            }
          }else if (command === 'changeMode') {
            // Call the client code that will react to the received command
            if(mode === 'light') {
                setMode('light')
            }else {
                setMode('dark');
            }
            } else if (command === 'login') {
              fetchToken();
            } else if(command === 'logout') {
              localStorage.clear();
              window.location.href = '/';
            }else if(command === 'search') {
              dispatch(searchMovie(query));
            }
        },
    });
  }, []);

}
export default useAlan;