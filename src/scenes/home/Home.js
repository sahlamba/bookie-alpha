/* @flow */

// Core
import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  AsyncStorage,
} from 'react-native';

// 3rd Party
import FBSDK, { AccessToken } from 'react-native-fbsdk';
import { Actions, ActionConst } from 'react-native-router-flux';
import Camera from 'react-native-camera';
import firebase from 'firebase';

// Styles
import styles from '../../styles/scenes/Home';

// Constants
import config from '../../services/Config';
const auth = firebase.auth();
const provider = firebase.auth.FacebookAuthProvider;

export default class Home extends Component {
  constructor(props) {
    super(props);
    this._onBarCodeScanned = this._onBarCodeScanned.bind(this);
    this._renderCamera = this._renderCamera.bind(this);
    this._isFetching = this._isFetching.bind(this);
    this.state = {
      isFetching: false,
      barCodeScanned: false,
      width: 0,
      height: 0,
      book: {}
    };
  }

  _onBarCodeScanned(data) {
    this.setState({
      isFetching: true,
      barCodeScanned: true
    });
    let isbn = data.data;
    console.log(isbn);
    fetch('https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn)
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.totalItems) {
          let book = responseData.items[0]; // Unique book for given ISBN

          let compiledBook = {};
          compiledBook.title = (book['volumeInfo']['title']);
          compiledBook.authors = (book['volumeInfo']['authors']);
          compiledBook.description = (book['volumeInfo']['description']);
          compiledBook.categories = (book['volumeInfo']['categories']);
          compiledBook.pageCount = (book['volumeInfo']['pageCount']);
          compiledBook.rating = (book['volumeInfo']['averageRating']);
          compiledBook.thumbnail = (book['volumeInfo']['imageLinks']['thumbnail']);

          Image.getSize(compiledBook.thumbnail, (w, h) => {
            this.setState({
              width: w,
              height: h
            })
          });

          this.setState({
            isFetching: false,
            book: compiledBook
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  _isFetching() {
    if (!this.state.barCodeScanned) {
      return (
        <Text style={styles.text}>
          Scan bar code from book
        </Text>
      );
    }
    if (this.state.isFetching) {
      return (
        <Text style={styles.text}>
          Fetching details...
        </Text>
      );
    } else {
      return null;
    }
  }

  _renderCamera() {
    if (!this.state.barCodeScanned) {
      return (
        <Camera ref={(cam) => {this._scanner = cam}}
          style={styles.camera}
          aspect={Camera.constants.Aspect.fill}
          onBarCodeRead={this._onBarCodeScanned} />
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.details}>
          {this._isFetching()}
          <Image
            style={{width: this.state.width, height: this.state.height}}
            source={{uri: this.state.book.thumbnail}} />
          <Text style={styles.text}>
            {this.state.book.title}
          </Text>
          <Text style={styles.text}>
            {this.state.book.authors}
          </Text>
          <Text style={styles.text}>
            {this.state.book.description}
          </Text>
        </View>
        {this._renderCamera()}
      </View>
    );
  }
}
