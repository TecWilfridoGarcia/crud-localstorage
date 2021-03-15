import React, { useState, useEffect } from 'react'
import "./styles.css";

export const Home = () => {

  const [notes, setNotes] = useState(() => {
    const notesValues = localStorage.getItem("notes");

    const notes = notesValues !== null ? JSON.parse(notesValues) : []
    return notes;
  });

  const initialForm = {
    id: Math.floor(Math.random() * Math.floor(1000)),
    nombre: "",
    apellidos: "",
    identificacion: "",
    fechaNacimiento: "",
    emails: [
      { mainEmail: "", auxEmail: "" },
    ],
    telefonos: [
      { mainTelefonos: "", auxTelefonos: "" },

    ],
    ubicaciones: [
      { direccion: "", ciudad: "", barrio: "", tipo: true },
    ]
  }

  const [noteEditing, setNoteEditing] = useState(initialForm);
  const [search, setSearch] = useState("");
  const { nombre,
    apellidos,
    identificacion,
    fechaNacimiento,
    emails,
    telefonos,
    ubicaciones,
  } = initialForm;
  const addNote = (e) => {
    e.preventDefault();
      setNotes((oldNotes) => [...oldNotes, noteEditing]);
      setNoteEditing(initialForm)
  };

  const handleInputChange = ({ target }) => {
    setNoteEditing({
      ...noteEditing,
      [target.name]: target.value,
    });
  };

  const handleNoteEdit = (nodeIdx) => {
    const [note] = notes.filter((item, index) => index === nodeIdx)
    setNoteEditing(note)
  }

  const handleDireccionChange = (index) => ({ target }) => {
    setNoteEditing((prevValue) => {
      return {
        ...prevValue,
        ubicaciones: prevValue.ubicaciones.map((uicacion, ubIdx) => {
          if (ubIdx === index) {
            return {
              ...uicacion,
              direccion: target.value,
            }
          }
          return uicacion;
        })
      }
    })
  }
  const handleCiudadChange = (index) => ({ target }) => {
    setNoteEditing((prevValue) => {
      return {
        ...prevValue,
        ubicaciones: prevValue.ubicaciones.map((uicacion, ubIdx) => {
          if (ubIdx === index) {
            return {
              ...uicacion,
              ciudad: target.value,
            }
          }
          return uicacion;
        })
      }
    })
  }
  const handleBarrioChange = (index) => ({ target }) => {
    setNoteEditing((prevValue) => {
      return {
        ...prevValue,
        ubicaciones: prevValue.ubicaciones.map((uicacion, ubIdx) => {
          if (ubIdx === index) {
            return {
              ...uicacion,
              barrio: target.value,
            }
          }
          return uicacion;
        })
      }
    })
  }

  const handleTipoChange = (index) => ({ target }) => {
    setNoteEditing((prevValue) => {
      return {
        ...prevValue,
        ubicaciones: prevValue.ubicaciones.map((uicacion, ubIdx) => {
          if (ubIdx === index) {
            return {
              ...uicacion,
              tipo: target.value,
            }
          }
          return uicacion;
        })
      }
    })
  }

  const handleMainEmailChange = (index) => ({ target }) => {
    setNoteEditing((prevValue) => {
      return {
        ...prevValue,
        emails: prevValue.emails.map((email, emailIdx) => {
          if (emailIdx === index) {
            return {
              ...email,
              mainEmail: target.value,
            }
          }
          return email;
        })
      }
    })
  }

  const handleAuxEmailChange = (index) => ({ target }) => {
    setNoteEditing((prevValue) => {
      return {
        ...prevValue,
        emails: prevValue.emails.map((email, emailIdx) => {
          if (emailIdx === index) {
            return {
              ...email,
              auxEmail: target.value,
            }
          }
          return email;
        })
      }
    })
  }

  const deleteNote = (idToDelete) => {
    const filteredNotes = notes.filter((note) => note.id !== idToDelete);
    setNotes(filteredNotes);
  };

  useEffect(() => {
    const json = JSON.stringify(notes);
    localStorage.setItem("notes", json);
  }, [notes]);

  return (
    <div >
      <form onSubmit={addNote}>
        <div className="container">
          <div className="row">
            <div className="col-sm">
              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">Nombre</label>
                <input onChange={handleInputChange} name="nombre" value={noteEditing.nombre} type="text" className="form-control" />
              </div>
            </div>
            <div className="col-sm">
              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">Fecha Nacimiento</label>
                <input onChange={handleInputChange} name="fechaNacimiento" value={noteEditing.fechaNacimiento} type="date" className="form-control" />
              </div>
            </div>
            <div className="col-sm">
              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">Identificacion</label>
                <input onChange={handleInputChange} name="identificacion" value={noteEditing.identificacion} type="text" className="form-control" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm">
              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">Apellidos</label>
                <input onChange={handleInputChange} name="apellidos" value={noteEditing.apellidos} type="text" className="form-control" />
              </div>
            </div>
            <div className="col-sm">
              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">Correo</label>
                {noteEditing.emails.map((item, index) => (
                  <div>
                    <input value={item.mainEmail} onChange={handleMainEmailChange(index)} type="email" className="form-control" placeholder="Correo Principal" /> <br />
                    <input value={item.auxEmail} onChange={handleAuxEmailChange(index)} type="email" className="form-control" placeholder="Correo Auxiliar" /> <br />
                  </div>
                ))}
              </div>
            </div>
            <div className="col-sm">
              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">Ubicacion</label>
                {noteEditing.ubicaciones.map((item, index) => (
                  <div>
                    <input value={item.direccion} onChange={handleDireccionChange(index)} type="text" className="form-control" placeholder="Direccion" /> <br />
                    <input value={item.ciudad} onChange={handleCiudadChange(index)} type="text" className="form-control" placeholder="Ciudad" /> <br />
                    <input value={item.barrio} onChange={handleBarrioChange(index)} type="text" className="form-control" placeholder="Barrio" /> <br />
                    <div class="d-flex p-2 bd-highlight align-items-center"> <p className="m-0 me-2">Principal </p> <input value={item.tipo} name="ddd" onChange={handleTipoChange(index)} type="radio" className="" /></div>
                  </div>
                ))}
              </div>
            </div>
          </div><button className="btn btn-success" type="submit">Guardar</button>
        </div>
      </form>
      <div className="container mb-3 mt-3">
        <input
          onChange={e => {
            const test = notes.filter(note => {
              return note.nombre.toLowerCase().includes(e.target.value.toLowerCase());
            });
            if (test.length > 0) {
              setNotes(test)
            }
            else {
              setNotes(notes)

            }
            setSearch(e.target.value);
          }}
          type="text"
          className="form-control"
          placeholder="Buscar" />
      </div>
      <div className="wrapper-table container">
        {notes.length === 0 ? <h1>Sin Datos</h1> : <table class="table">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Apellidos</th>
              <th scope="col">identificacion</th>
              <th scope="col">Fecha de nacimiento</th>
              <th scope="col">Email principal</th>
              <th scope="col">Email auxiliar</th>
              <th scope="col">Telefono principal</th>
              <th scope="col">Telefono auxiliar</th>
              <th scope="col">Direccion</th>
              <th scope="col">Ciudad</th>
              <th scope="col">Barrio</th>
              <th scope="col">Tipo</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {notes.map((customer, index) => (
              <tr>
                <th>{customer.nombre}</th>
                <th>{customer.apellidos}</th>
                <th>{customer.identificacion}</th>
                <th>{customer.fechaNacimiento}</th>
                <th>{customer.emails.map(item => item.mainEmail)}</th>
                <th>{customer.emails.map(item => item.auxEmail)}</th>
                <th>{customer.ubicaciones.map(item => item.mainTelefono)}</th>
                <th>{customer.ubicaciones.map(item => item.auxTelefono)}</th>
                <th><p>{customer.ubicaciones.map(item =>
                  <p>{item.tipo ? item.direccion + " (principal)" : item.direccion}<br /></p>)}</p></th>
                <th><p>{customer.ubicaciones.map(item =>
                  <p>{item.ciudad}<br /></p>)}</p></th>
                <th>{customer.ubicaciones.map(item =>
                  <p>{item.barrio}<br /></p>)}</th>
                <th><p>{customer.ubicaciones.map(item =>
                  <p>{item.direccion}<br /></p>)}</p></th>
                <th>{customer.ubicaciones.map(item => (item.tipo ? "Principal" : ""))}</th>
                <th scope="col"> <button className="btn btn-danger" onClick={() => deleteNote(customer.id)}>Borrar</button></th>
                <th scope="col"> <button className="btn btn-primary" onClick={(event) => {
                  handleNoteEdit(index)
                }}>Editar</button></th>
              </tr>
            ))}
          </tbody>
        </table>}
      </div>

    </div>
  )
}
