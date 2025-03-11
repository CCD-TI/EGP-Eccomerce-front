"use client"
import { useEffect, useState } from 'react';
import { CiCreditCard1 } from 'react-icons/ci';
import { FaCheck } from 'react-icons/fa';
import { MdQrCodeScanner, MdPhoneIphone } from 'react-icons/md';
import { FaUniversity } from 'react-icons/fa';
import { FaBasketShopping, FaCreditCard } from 'react-icons/fa6';
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import 'aos/dist/aos.css'; // Importa los estilos de AOS
import AOS from 'aos'; // Importa AOS
import Image from 'next/image';
import { environment } from '@/environments/environment'
import KRGlue from '@lyracom/embedded-form-glue'
import { useCartStore } from '@/context/cartStore';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useSession } from "next-auth/react";

interface props {
  total1: any
  selecterms: any,
  array: any
}

export default function App({ total1, selecterms, array }: props) {
  const { data: session } = useSession();
  const router = useRouter(); // Inicializas el hook useRouter

  const [nombresValue, setnombresValue] = useState('')
  const [dniValue, setdniValue] = useState('')
  const [universidadValue, setuniversidadValue] = useState('')
  const [cargoValue, setcargoValue] = useState('')
  const [areaValue, setareaValue] = useState('')

  const api = axios.create({
    baseURL: environment.baseUrl,
    headers: { "Content-Type": "application/json" },
  });



  const [message, setMessage] = useState('')
  const [number, setNumber] = useState(true)
  const [isopen, setisopen] = useState(false)

  const [krInstance, setKrInstance] = useState<any>(null); // Estado para almacenar la instancia de KR





  useEffect(() => {
    async function setupPaymentForm() {
      const endpoint = 'https://api.micuentaweb.pe';
      const publicKey = environment.izipago;
      let formToken = '';

      try {
        if (total1 > 0) {

          const res = await fetch(environment.baseUrl + '/pago/CreatePayment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: total1 * 100, currency: 'PEN' })
          });
          formToken = await res.text();
          const { KR } = await KRGlue.loadLibrary(endpoint, publicKey);

          await KR.setFormConfig({
            formToken,
            'kr-language': 'es-ES'
          });



          await KR.removeForms();
          await KR.renderElements('#myPaymentForm');

          setKrInstance(KR);

          await KR.onSubmit(async (paymentData: KRPaymentResponse) => {
            try {
              const response = await fetch(environment.baseUrl + '/pago/validatePayment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(paymentData),
              });
              if (response.status === 200) {

                await Promise.all(array.map(async (curso: any) => {
                await api.post("/inicio/concretarventa", {
                    fproductoid: curso.idprod,
                    fusuarioid: session?.user.uid,
                    fprecio: curso.Precio
                  });
                }));

                const MySwal = withReactContent(Swal);
                MySwal.fire({
                  title: "Su compra fue realizada con éxito",
                  text: "Completar el siguiente formulario para poder brindarle sus accesos a la plataforma",
                  icon: "success",
                  showCancelButton: false,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Empezar a completar el formulario",
                  allowOutsideClick: false,
                }).then((result) => {
                  if (result.isConfirmed) {
                    clearCart()
                    setisopen(true)
                    //router.push(`/`)
                  }
                });
                setMessage('Payment successful!');

              } else {
                setMessage('Payment failed!');
              }
            } catch (error) {
              console.error('Error processing payment:', error);
              setMessage('Payment failed due to an error!');
            }

            return false; // Debemos devolver un booleano explícitamente

          });

        }
      } catch (error) {
        setMessage(error + ' (ver consola para más detalles)');
        console.error('Error en la configuración del formulario:', error);
      }
    }

    setupPaymentForm();

    return () => {
      if (krInstance) {
        krInstance.removeForms(); // Remueve el formulario cuando el componente se desmonte
      }
    };
  }, [number, total1]);



  const buttons = [
    { id: 1, label: 'Tarjetas', img: "/Multimedia/Imagen/card.svg", },
    //{ id: 2, label: 'QR', img: "/Multimedia/Imagen/qr.svg", },
    // { id: 3, label: 'YAPE', img: "/Multimedia/Imagen/yapelogo.svg", },
    // { id: 4, label: 'Interbank', img: "/Multimedia/Imagen/interbankc.svg", },
  ];

  // Estado para controlar el botón activo y una clave de animación
  const [activeButton, setActiveButton] = useState<number>(buttons[0].id);
  const [animationKey, setAnimationKey] = useState<number>(0);

  // Inicializa AOS
  useEffect(() => {
    AOS.init({
      duration: 1000, // Duración de las animaciones
      once: false, // Permite que las animaciones se repitan
      mirror: false, // Si las animaciones se deben volver a ejecutar al hacer scroll hacia arriba
    });
  }, []);

  // Cambia el contenido y reinicia AOS
  const handleButtonClick = (id: number) => {
    setNumber(!number);
    setActiveButton(id);
    setAnimationKey(prevKey => prevKey + 1); // Actualiza la clave de animación
  };

  const renderContent = () => {
    switch (activeButton) {
      case 1:

        return (
          <div key={animationKey} className='flex flex-col justify-center items-center gap-4 p-4 !bg-transparent !rounded-none' data-aos="fade-up">
            <div className='flex flex-col gap-4 p-6 justify-center   !bg-transparent !rounded-none'>

              <div className="container">
                <div id="myPaymentForm">
                  <div className="kr-smart-form" kr-card-form-expanded="true" />
                </div>

                <div data-test="payment-message">{message}</div>
              </div>

            </div>
          </div>
        );
      case 2:
        return (
          <div key={animationKey} className='flex flex-col justify-center items-center gap-2 p-4 rounded-xl' data-aos="fade-right">
            <div className='flex flex-col gap-4 p-6 justify-center rounded-xl  shadow-md'>
              <div className='flex flex-col gap-4 items-center justify-between'>
                <MdQrCodeScanner className='h-[30%] w-[40%] ' />
                <div className='flex gap-2'>
                  <Image className='h-8 w-8 rounded-full' alt='' src="/Multimedia/Imagen/bbva.svg" about='' width={300} height={0} />
                  <Image className='h-8 w-8 rounded-full' alt='' src="/Multimedia/Imagen/scotiabank.svg" about='' width={300} height={0} />
                  <Image className='h-8 w-8 rounded-full' alt='' src="/Multimedia/Imagen/plin.svg" about='' width={300} height={0} />
                  <Image className='h-8 w-8 rounded-full' alt='' src="/Multimedia/Imagen/interbankc.svg" about='' width={300} height={0} />
                  <Image className='h-8 w-8 rounded-full' alt='' src="/Multimedia/Imagen/yapelogo.svg" about='' width={300} height={0} />
                </div>
                <div className='flex flex-col text-xs'>

                  <span> Escanea el Código QR para pagar</span>
                </div>
              </div>
              <hr className="border-t border-dashed border-black" />
              <div className='flex flex-col p-2 bg-blue-700/35 justify-center items-center'>
                <h1 className="">Monto total:</h1>
                <h1 className="font-bold text-2xl">S/8000</h1>
              </div>

              <h1 className='text-center'>Escanee el código para proceder con el pago</h1>
            </div>
          </div>
        );
      case 3:
        return (
          <div key={animationKey} className='flex flex-col justify-center items-center gap-4 p-4 rounded-xl' data-aos="fade-up-left">
            <div className='flex flex-col gap-4 p-6 justify-center border-2 rounded-xl bg-white shadow-md'>
              <div className='flex flex-col gap-4 items-center justify-between'>
                <Image alt='' src="/Multimedia/Imagen/logo.png" about='' accessKey='' width={300} height={0} className='h-20 w-20' />
                <div className='flex flex-col text-xs'>
                  <h1>Pagar con YAPE</h1>
                  <span>Yapea fácilmente</span>
                </div>
              </div>
              <hr className="border-t border-dashed border-black" />
              <button className="bg-blue-500 text-white p-2 rounded-lg">Pagar con YAPE</button>
              <h1 className='text-center'>Utiliza YAPE para realizar tus pagos</h1>
            </div>
          </div>
        );
      case 4:
        return (
          <div key={animationKey} className='flex flex-col justify-center items-center gap-4 p-4 rounded-xl' data-aos="fade-left">
            <div className='flex flex-col gap-4 p-6 justify-center border-2 rounded-xl bg-white shadow-md'>
              <div className='flex items-center justify-between'>
                <FaUniversity className='h-8 w-8' />
                <div className='flex flex-col text-xs'>
                  <h1>Banco Interbank</h1>
                  <span>Realiza tus operaciones bancarias</span>
                </div>
              </div>
              <hr className="border-t border-dashed border-black" />
              <button className="bg-blue-500 text-white p-2 rounded-lg">Usar Interbank</button>
              <h1 className='text-center'>Accede a tus cuentas de Interbank</h1>
            </div>
          </div>
        );
      default:
        return <div className="text-center p-4">Selecciona una opción</div>;
    }
  };

  const clearCart = useCartStore((state) => state.clearCart);

  const envioform = () => {
    const mensaje = `<!DOCTYPE html>
    <html lang="es">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Recibo WIN</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f7f7f7;
            }

            .container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                border: 1px solid #ddd;
            }

            .header {
                background-color: #042C54;
                color: white;
                text-align: center;
                padding: 20px;
                position: relative;
                height: 100%;
            }

            .header img {
                height: auto;
                width: 275px;
            }


            .content {
                padding: 20px;
                text-align: center;
            }

            .customer-name {
                font-weight: bold;
                color: #021B96;
            }

            .chart {
                display: flex;
                justify-content: space-around;
                align-items: flex-end;
                margin: 20px 0;
            }

            .bar-container {
                text-align: center;
            }

            .bar {
                width: 30px;
                background-color: #ddd;
                margin-bottom: 5px;
            }

            .bar-container.current .bar {
                background-color: #ff6600;
            }

            .payment-info {
                display: flex;
                justify-content: space-around;
                margin: 20px 0;
            }

            .info-box {
                padding: 10px;
                width: 50%;
                margin:auto;
            }

            .payment-code {
                background-color: #f0f0f0;
                padding: 10px;
                margin: 20px 0;
                text-align: center;
            }

            .payment-options {
                text-align: center;
                margin: 20px 0;
            }

            .payment-options button {
                background-color: #ff6600;
                color: white;
                border: none;
                padding: 10px 20px;
                cursor: pointer;
                font-size: 16px;
                margin-bottom: 10px;
            }

            .banks img {
                width: 50px;
                margin: 0 5px;
            }

            .footer {
                background-color: #042C54;
                color: white;
                text-align: center;
                padding: 20px;

            }
        </style>
    </head>

    <body>
        <div class="container">
            <header class="header">
                <img src="https://ccdcapacitacion.edu.pe/wp-content/uploads/2022/10/PLANTILLA-WEB-CCD.png" alt="" class="logo">
            </header>

            <section class="content">
                <h2>Nuevo Alumno!, <br><span class="customer-name">${nombresValue}</span></h2>
                <p>Te enviamos tus credenciales.</p>


                <div class="payment-info">
                    <div class="info-box">
                        <div style="display: flex;gap: 4px;  align-items: center;">
                            <h3>Dni:</h3>
                            <p>${dniValue}</p>
                        </div>
                        <div style="display: flex;gap: 4px; align-items: center;">
                            <h3>Universidad:</h3>
                            <p>${universidadValue}</p>
                        </div>
                        <div style="display: flex;gap: 4px; align-items: center;">
                            <h3>Cargo:</h3>
                            <p>${cargoValue}</p>
                        </div>
                        <div style="display: flex;gap: 4px; align-items: center;">
                            <h3>Area:</h3>
                            <p>${areaValue}</p>
                        </div>
                    </div>

                </div>

            </section>

            <footer class="footer">
                <p>Responder porfavor lo mas pronto posible</p>
            </footer>
        </div>
    </body>

    </html>`

    api.post("/inicio/EnviarCorreoPago", {
      pdestinatario: 'infenix.reborn@gmail.com',
      pmensaje: mensaje
    })

    Swal.fire({
      title: "Formulario Enviado",
      text: "Gracias por completar el formulario, en unos instantes le llegara un correo con sus credenciales para la plataforma de estudio",
      icon: "success"
    }).then((result) => {
      if (result.isConfirmed) {
        router.push(`/`)
      }
    });
  };

  return (
    <div>

      <div className="flex gap-4 mb-8 justify-center">
        {buttons.map((button) => {
          const Icon = button.img; // Desestructuración del ícono específico

          return (
            <button
              key={button.id}
              className={`relative flex p-6 gap-2 items-center rounded-lg shadow-md border-2 ${activeButton === button.id ? 'border-[#00A09D]' : 'border-gray-300'
                }`}
              onClick={() => handleButtonClick(button.id)}
            >
              {activeButton === button.id && (
                <FaCheck
                  className="absolute top-1 right-1 rounded-full text-white bg-[#00A09D] p-[4px] h-4 w-4"
                />
              )}
              <Image alt='' src={button.img} width={300} height={0} className="h-8 w-8 rounded-full" /> {/* Renderiza el ícono específico */}
              <h1 className='text-white'>{button.label}</h1>
            </button>
          );
        })}
      </div>
      <h1 className='text-center text-xs text-white' >Recuerde activar sus compras por internet</h1>
      <div className='flex flex-col justify-center items-center gap-4 p-4 rounded-xl'>
        {renderContent()}
      </div>

      <Modal isOpen={isopen}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Llenar Formulario</ModalHeader>
              <ModalBody>
                <Input
                  label="Nombres Completo"
                  placeholder=""
                  value={nombresValue}
                  onValueChange={setnombresValue}
                />
                <Input
                  label="Dni"
                  placeholder=""
                  value={dniValue}
                  onValueChange={setdniValue}
                />
                <Input
                  label="Universidad Actual"
                  placeholder=""
                  value={universidadValue}
                  onValueChange={setuniversidadValue}
                />
                <Input
                  label="Cargo Actual"
                  placeholder=""
                  value={cargoValue}
                  onValueChange={setcargoValue}
                />
                <Input
                  label="Area de interes"
                  placeholder=""
                  value={areaValue}
                  onValueChange={setareaValue}
                />
              </ModalBody>
              <ModalFooter>


                <Button color="primary" onPress={() => envioform()}>
                  Terminar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
