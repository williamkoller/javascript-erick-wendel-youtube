class InvalidFormatError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidFormatError';
  }
}

class InvalidLengthError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidLengthError';
  }
}

function validateCpf(cpf) {
  if (isNaN(cpf)) {
    throw new InvalidFormatError(`O CPF [${cpf}] deve conter apenas numeros`);
  }

  if (cpf.length !== 11) {
    throw new InvalidLengthError(`O CPF [${cpf}] deve conter 11 numeros`);
  }
}

for (const cpf of ['1223', 'abd', '12345678901']) {
  try {
    validateCpf(cpf);
    console.log(`O CPF [${cpf}] eh valido`);
  } catch (e) {
    if (e instanceof InvalidFormatError || e instanceof InvalidLengthError) {
      console.log(e.message);
      continue;
    } else {
      console.log('Erro desconhecido', e);
    }
  }
}
