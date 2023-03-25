import * as jose from 'jose';

export const useJWT = (alg, typ = 'JWT') => {
	const encode = (data, expitationTime = '5m') => {
		return new Promise(async (resolve, reject) => {
			try {
				const secret = new TextEncoder().encode(process.env.REACT_APP_JWT_SECRET);
				const jwt = await new jose.SignJWT({ data })
					.setProtectedHeader({ alg, typ })
					.setIssuedAt()
					.setExpirationTime(expitationTime)
					.sign(secret);
				resolve(jwt);
			} catch (error) {
				reject(error);
			}
		});
	};

	const decode = jwt => {
		return new Promise(async (resolve, reject) => {
			try {
				const secret = new TextEncoder().encode(process.env.REACT_APP_JWT_SECRET);
				const { payload, protectedHeader: headers } = await jose.jwtVerify(jwt, secret);
				resolve({ payload, headers, isValid: true, error: false });
			} catch (error) {
				reject({ payload: null, headers: null, isValid: false, error });
			}
		});
	};

	return {
		encode,
		decode
	};
};