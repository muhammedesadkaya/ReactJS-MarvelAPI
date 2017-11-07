import React from 'react';
import md5 from 'md5';
import $ from 'jquery';

import SearchBar from './SearchBar';
import CharacterList from './CharacterList';
import Details from './Details';

const API_URL = 'https://gateway.marvel.com:443/v1/public/';
const publicKey = 'dca6afc911a7e3809c30182c12ceb43f';
const privateKey = '1fc0782a90dfb824f79673937c33c8b7fa62387f';
const ts = '1';
const auth = `ts=${ts}&apikey=${publicKey}&hash=${md5(`${ts}${privateKey}${publicKey}`)}`;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      characters: null,
      selectedCharacter: null,
    };
    this.CharacterSearch = this.CharacterSearch.bind(this);
  }

  componentDidMount = () => {
    this.GetMarvelHeroes();
  };

  GetMarvelHeroes() {
    $.getJSON(`${API_URL}/characters?${auth}&limit=5`, result => {
      const characters = result.data.results;
      this.setState({ characters });
    });
  }

  CharacterSearch(term) {
    $.getJSON(`${API_URL}/characters?${auth}&limit=5&nameStartsWith=${term}`, result => {
      const characters = result.data.results;
      this.setState({ characters });
    });
  }

  handleCharacterSelect = character => {
    this.setState({ selectedCharacter: character });
  };

  render() {
    if (!this.state.characters) return <h1>Loading...</h1>;
    return (
      <div className="container">
        <SearchBar onSearchButtonClick={this.CharacterSearch} />
        <CharacterList
          characters={this.state.characters}
          onCharacterSelect={this.handleCharacterSelect}
        />
        <Details character={this.state.selectedCharacter || this.state.characters[0]} />
      </div>
    );
  }
}

export default App;
