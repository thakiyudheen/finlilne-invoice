// import axios from 'axios' ;

// export async function getBase64ImageFromURL(url: string): Promise<string> {
//     try {
//       const response = await axios.get(url, { responseType: 'arraybuffer' });
//       const imageBuffer = Buffer.from(response.data, 'binary');
//       console.log('iamge buffer');
      
//       return imageBuffer.toString('base64');
//     } catch (error) {
//       console.error('Error fetching logo image:', error);
//       throw new Error('Could not fetch logo image');
//     }
//   }
  
import axios from 'axios';

export async function getBase64ImageFromURL(url: string): Promise<string> {
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });

        // Convert the array buffer to a binary string, then to Base64
        const binary = Array.from(new Uint8Array(response.data))
            .map((byte) => String.fromCharCode(byte))
            .join('');
        return btoa(binary);  // Convert binary string to Base64
    } catch (error) {
        console.error('Error fetching logo image:', error);
        throw new Error('Could not fetch logo image');
    }
}
