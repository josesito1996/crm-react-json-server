import { useNavigate } from "react-router-dom";

const Cliente = ({ cliente, handleEliminar }) => {
  const navigate = useNavigate();
  const { nombre, empresa, email, telefono, notas, id } = cliente;
  return (
    <tr className="border-b hover:bg-gray-200">
      <td className="p-3">{nombre}</td>
      <td className="p-3">
        <p>
          <span className="text-gray-800 uppercase font-bold">Email :</span>
          {email}
        </p>
        <p>
          <span className="text-gray-800 uppercase font-bold">Telf :</span>
          {telefono}
        </p>
      </td>
      <td className="p-3">{empresa}</td>
      <td className="p-3">
        <button
          className="bg-yellow-500 hover:bg-yellow-600 block w-full text-white p-2 uppercase font-bold text-xs rounded-md"
          onClick={() => navigate(`/clientes/${id}`)}
          type="button"
        >
          Ver
        </button>
        <button
          className="bg-blue-600 hover:bg-blue-700 block w-full text-white p-2 uppercase font-bold text-xs rounded-md mt-3"
          onClick={() => navigate(`/clientes/editar/${id}`)}
          type="button"
        >
          Editar
        </button>
        <button
          className="bg-red-600 hover:bg-red-700 block w-full text-white p-2 uppercase font-bold text-xs rounded-md mt-3"
          onClick={() => handleEliminar(id)}
          type="button"
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default Cliente;