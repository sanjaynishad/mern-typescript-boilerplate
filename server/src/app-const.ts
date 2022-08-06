export const IsProduction = process.env.NODE_ENV === 'production';
export const IsDevelopment = process.env.NODE_ENV === 'development';

export const AppConst = Object.freeze({
    mongoUri: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET, // || 'a[RmtoC$00[Ahsg',
    jwtMaxAge: 30 * 24 * 60 * 60 * 1000,
    contentSecurityPolicy: "default-src *; img-src 'self' https://maps.googleapis.com https://maps.gstatic.com data:; style-src 'self' http://* 'unsafe-inline'; script-src 'self' https://maps.googleapis.com 'unsafe-inline' 'unsafe-eval'",
    awsS3Configs: Object.freeze({
        S3ClientConfig: {
            endpoint: process.env.S3_ENDPOINT,
            region: process.env.S3_ENDPOINT,
            credentials: {
                accessKeyId: process.env.S3_KEY,
                secretAccessKey: process.env.S3_SECRET,
            },
        },
        S3ImageBucket: process.env.S3_BUCKET,
        S3ImageFolder: IsProduction ? 'images' : 'images-dev',
    }),
} as const);
