import { dbService } from 'fbase';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { deleteObject, ref } from 'firebase/storage';
import { storageService } from 'fbase';

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
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your nweet"
              value={newNweet}
              onChange={onChange}
              required
            />
            <input type="submit" value="Update Nweet" />
          </form>
          <button onClick={toggleEditing}> cancle</button>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {nweetObj.attachmentUrl && (
            <img src={nweetObj.attachmentUrl} width="50px" height="50px" />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Nweet</button>
              <button onClick={toggleEditing}>Edit Nweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
