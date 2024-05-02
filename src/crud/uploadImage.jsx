import React, { useRef } from 'react';

const UploadImage = ({user}) => {

  const fileInputRef = useRef(null);
  const image = async (file, user) => {
    
    const formData = new FormData();
    formData.append('img_file', file);
    console.log(formData)
  
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://evaluacion.sierpes48.es/usuarios/upload-file/${user.user.username}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Imagen subida exitosamente:', data);
      } else {
        console.error('Error al subir la imagen:', response.statusText);
      }
    } catch (error) {
      console.error('Error en la solicitud de subida de imagen:', error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      image(file, user);
    }
  };
  const handleLinkClick = () => {
    fileInputRef.current.click();
  };

  const imageUrl = `https://evaluacion.sierpes48.es/${user.user.img_file_dir}${user.user.img_file}`;

  console.log(imageUrl)

  return (
    <div style={profileImageStyle}>
      {user.user.img_file_dir ? (
      <img
        src={imageUrl}
        alt="Imagen creada"
        onClick={handleLinkClick} 
        style={{height: '120px',
        width: '120px', borderRadius: '50%'}}
      />
      ):(
      <img
        src="https://placehold.co/120x120"
        alt="Profile"
        style={profileImageStyle} 
        onClick={handleLinkClick} 
      />
      )
      }
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        accept="image/*"
      />
    </div>
  )
}

  const profileImageStyle = {
    height: '120px',
    cursor: 'pointer',
    width: '120px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

export default UploadImage;