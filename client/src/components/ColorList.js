import React, { useState } from "react";
import axiosWithAuth from "./utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [add, setAdd] = useState(false)

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        getColors();
      })
      .catch(err => console.log(err.response));
  };

  const saveAdd = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        getColors();
      })
      .catch(err => console.log(err.response));
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`http://localhost:5000/api/colors/${colorToEdit.id}`)
      .then(getColors())
      .catch(err => console.log(err))
  };

  const getColors = () => {
    axiosWithAuth()
      .get('http://localhost:5000/api/colors')
      .then(res => {
        updateColors(res.data);
      })
      .catch(err => console.log(err.response));
  };

  const [newColor, setNewColor] = useState({
    color: '',
    code: { hex: '' },
    id: Date.now()
  });

  const handleSubmit = e => {
    e.preventDefault();

    axiosWithAuth()
      .post('http://localhost:5000/api/colors', newColor)
      .then(res => {
        getColors();
      })
      .catch(err => console.log(err.response));
  };

  const changeHandler = e => {
    setNewColor({ ...newColor, [e.target.name]: e.target.value });
  };

  const codeChangeHandler = e => {
    setNewColor({ ...newColor, code: { hex: e.target.value } });
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">Save</button>
            <button onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </form>
      )}
      <div className="spacer">
      {/* stretch - build another form here to add a color */}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="code"
          onChange={codeChangeHandler}
          placeholder="#  Hex Code"
          value={newColor.code.hex}
        />

        <input
          type="text"
          name="color"
          onChange={changeHandler}
          placeholder="Color Name"
          value={newColor.color}
        />

        <button type="submit">Add Color</button>
      </form>
       </div>       
    </div>
  );
};

export default ColorList;
