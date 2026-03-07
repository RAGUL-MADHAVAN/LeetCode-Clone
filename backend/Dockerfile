FROM node:20-bullseye-slim

# Install compilers for C++, Python, and Java
RUN apt-get update && apt-get install -y \
    g++ \
    python3 \
    default-jdk \
    && rm -rf /var/lib/apt/lists/*

# Map python3 to python if not already done automatically
RUN ln -s /usr/bin/python3 /usr/bin/python || true

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
