import {
  createContext,
  ReactNode,
  useContext,
  useState,
} from "react";

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
};

type PlayerContextData = {
  episodeList: Array<Episode>;
  currentEpisodeIndex: number;
  isPlaying: boolean;
  playList: (list: Episode[], index: number) => void;
  play: (episode: Episode) => void;
  togglePlay: () => void;
  setPlayingState: (state: boolean) => void;
  playNext: () => void;
  playPrevious: () => void;
  hasNext;
  hasPrevious;
  isLooping: boolean;
  isShuffling: boolean;
  toggleShuffle: () => void;
  clearPlayerState: () => void;
  toggleLoop: () => void;
};
export const PlayerContext = createContext({} as PlayerContextData);
type PlayerContextProviderProps = {
  children: ReactNode;
};

export function PlayerContextProvider({
  children,
}: PlayerContextProviderProps) {
  const [isLooping, setIsLooping] = useState(false);
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  const play = (episode: Episode) => {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  };

  const playList = (list: Episode[], index: number) => {
    setEpisodeList(list);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
  };
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleLoop = () => {
    setIsLooping(!isLooping);
  };
  const toggleShuffle = () => {
    setIsShuffling(!isShuffling);
  };

  const clearPlayerState = () => {
    setEpisodeList([]);
    setCurrentEpisodeIndex(0);
  };
  const hasNext =
    isShuffling || currentEpisodeIndex + 1 < episodeList.length;
  const hasPrevious = currentEpisodeIndex > 0;

  const playNext = () => {
    if (isShuffling) {
      const nextRandomEpisodeIndex = Math.floor(
        Math.random() * episodeList.length
      );
      setCurrentEpisodeIndex(nextRandomEpisodeIndex);
    }
    const nextEpisodeIndex = currentEpisodeIndex + 1;
    if (isLooping) nextEpisodeIndex == currentEpisodeIndex;

    if (nextEpisodeIndex >= episodeList.length) {
      return;
    } else setCurrentEpisodeIndex(currentEpisodeIndex + 1);
  };

  const playPrevious = () => {
    const previousEpisodeIndex = currentEpisodeIndex - 1;

    if (previousEpisodeIndex == -1) {
      return;
    } else setCurrentEpisodeIndex(currentEpisodeIndex - 1);
  };
  const setPlayingState = (state: boolean) => {
    setIsPlaying(state);
  };
  return (
    <PlayerContext.Provider
      value={{
        episodeList,
        currentEpisodeIndex,
        play,
        isPlaying,
        togglePlay,
        setPlayingState,
        playList,
        playPrevious,
        playNext,
        hasNext,
        hasPrevious,
        isShuffling,
        isLooping,
        toggleLoop,
        toggleShuffle,
        clearPlayerState,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => {
  return useContext(PlayerContext);
};
