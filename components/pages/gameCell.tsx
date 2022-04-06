import styled from '@emotion/styled'
import Link from 'next/link'
import { GameInfo } from 'types'
import { enumWord } from 'utils/word'

import { IcoMoonIcon } from '../icons'

export declare interface GameCellProps {
  game: GameInfo
  width?: number
  height?: number
  small?: boolean
  collectionLink?: string
}

export function GameCell({
  game,
  width = 316,
  height = 250,
  small = false,
  collectionLink,
}: GameCellProps) {
  const Container = styled.div<Pick<Required<GameCellProps>, 'width'>>`
    display: inline-block;
    position: relative;
    vertical-align: top;
    text-align: left;
    margin: 0 20px 40px 0;
    width: ${(p) => `${p.width}px`};
    &:hover .game-cell-tools {
      opacity: 1;
    }
  `
  const GameThumbLink = styled.a`
    text-decoration: none;
  `
  const GameThumb = styled.div<
    Pick<Required<GameCellProps>, 'width' | 'height'> & { cover: string }
  >`
    background-image: ${(p) => `url(${p.cover})`};
    background-position: 50% 50%;
    background-size: cover;
    display: block;
    position: relative;
    width: ${(p) => `${p.width}px`};
    height: ${(p) => `${p.height}px`};
    box-shadow: 0 0 2px rgb(0 0 0 / 15%);
  `
  const GameCellTools = styled.div`
    position: absolute;
    top: 5px;
    right: 10px;
    opacity: 0;
    transition: opacity 0.2s ease, top 0.2s ease;
  `
  const AddToCollection = styled.a`
    user-select: none;
    display: inline-flex;
    align-items: center;
    color: #eee;
    padding: 2px 4px;
    cursor: pointer;
    margin-bottom: 10px;
    text-decoration: none;
    text-align: left;
    border: 4px solid #da2c49;
    background-color: rgba(30, 30, 30, 0.8);
    font-size: 14px;
    font-weight: bold;
    box-shadow: none;
    border-radius: 3px;
  `
  const GameCellData = styled.div`
    margin-top: 6px;
    & > * {
      margin-bottom: 6px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  `
  const GameTitle = styled.div`
    font-size: 16px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  `
  const GameTitleLink = styled.a`
    font-weight: bold;
    color: inherit;
    text-decoration: none;
    margin-right: 6px;
    word-wrap: break-word;
    &:hover {
      text-decoration: underline;
    }
  `
  const GameText = styled.div<Pick<Required<GameCellProps>, 'small'>>`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #606060;
    font-size: 14px;
    display: ${(p) => (p.small ? 'none' : 'block')};
  `
  const GameAuthor = styled.div<Pick<Required<GameCellProps>, 'small'>>`
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #606060;
    display: ${(p) => (p.small ? 'none' : 'block')};
  `
  const GameAuthorLink = styled.a`
    min-width: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: inherit;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  `
  const GameGenre = styled.div<Pick<Required<GameCellProps>, 'small'>>`
    font-size: 14px;
    color: #858585;
    display: ${(p) => (p.small ? 'none' : 'block')};
  `
  const GamePlatform = styled.div<Pick<Required<GameCellProps>, 'small'>>`
    font-size: 14px;
    color: #858585;
    display: ${(p) => (p.small ? 'none' : 'block')};
  `
  const { title, subtitle, cover, link, genre, platform, user } = game
  const profileUrl = `https://${user?.username}.w3itch.io`

  return (
    <Container className="game-cell" width={width}>
      <Link href={link} passHref>
        <GameThumbLink>
          <GameThumb cover={cover} width={width} height={height} />
        </GameThumbLink>
      </Link>
      {collectionLink && (
        <GameCellTools className="game-cell-tools">
          <Link href={collectionLink} passHref>
            <AddToCollection>
              <IcoMoonIcon name="playlist_add" />
              Add to collection
            </AddToCollection>
          </Link>
        </GameCellTools>
      )}
      <GameCellData>
        <GameTitle>
          <Link href={link} passHref>
            <GameTitleLink>{title}</GameTitleLink>
          </Link>
        </GameTitle>
        {subtitle && <GameText small={small}>{subtitle}</GameText>}
        {user && (
          <GameAuthor small={small}>
            <Link href={profileUrl} passHref>
              <GameAuthorLink>{user.username}</GameAuthorLink>
            </Link>
          </GameAuthor>
        )}
        {genre && <GameGenre small={small}>{enumWord(genre)}</GameGenre>}
        {platform && <GamePlatform small={small}></GamePlatform>}
      </GameCellData>
    </Container>
  )
}