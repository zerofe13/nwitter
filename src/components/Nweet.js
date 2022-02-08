/* eslint-disable react/jsx-pascal-case */
/* eslint-disable jsx-a11y/alt-text */
import { dbService } from 'fbase';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { deleteObject, ref } from 'firebase/storage';
import { storageService } from 'fbase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const NweetBlock = styled.div`
  margin-bottom: 20px;
  background-color: white;
  max-width: 320px;
  width: 100%;
  padding: 20px;
  border-radius: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  color: rgba(0, 0, 0, 0.8);
  h4 {
    font-size: 14px;
  }
  img {
    right: -10px;
    top: 20px;
    position: absolute;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    margin-top: 10px;
  }
`;
const NweetEdit = styled.form`
  cursor: pointer;
  margin-top: 15px;
  margin-bottom: 5px;
`;

const Nweet__actions = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  span {
    cursor: pointer;
    :first-child {
      margin-right: 10px;
    }
  }
`;

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const NweetTextRef = doc(dbService, 'nweets', `${nweetObj.id}`);
  const urlRef = ref(storageService, nweetObj.attachmentUrl);
  const onDeleteClick = async () => {
    const ok = window.confirm('Are you sure you want to delete this nwteet?');
    if (ok) {
      //delete nweet
      await deleteDoc(NweetTextRef);
      await deleteObject(urlRef);
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    await updateDoc(NweetTextRef, { text: newNweet });
    toggleEditing();
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewNweet(value);
  };
  return (
    <NweetBlock>
      {editing ? (
        <>
          <NweetEdit onSubmit={onSubmit} className="container">
            <input
              type="text"
              placeholder="Edit your nweet"
              value={newNweet}
              onChange={onChange}
              required
              className="formInput"
            />
            <input
              type="submit"
              value="Update Nweet"
              className="formBtn"
              style={{ marginTop: 20, marginBottom: 5, cursor: 'pointer' }}
            />
          </NweetEdit>
          <span onClick={toggleEditing} className="formBtn cancelBtn">
            cancle
          </span>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} />}
          {isOwner && (
            <Nweet__actions>
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </Nweet__actions>
          )}
        </>
      )}
    </NweetBlock>
  );
};

export default Nweet;
