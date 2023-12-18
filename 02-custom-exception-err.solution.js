function validateCpf(cpf) {
  const errors = [];
  if (isNaN(cpf)) {
    errors.push({
      name: 'InvalidFormatError',
      message: `O CPF [${cpf}] deve conter apenas numeros`,
    });
  }

  if (cpf.length !== 11) {
    errors.push({
      name: 'InvalidLengthError',
      message: `O CPF [${cpf}] deve conter 11 numeros`,
    });
  }

  return {
    valid: !errors.length,
    errors,
  };
}

for (const cpf of ['1223', 'abd', '12345678901']) {
  const { valid, errors } = validateCpf(cpf);

  if (valid) {
    console.log(`O CPF [${cpf}] eh valido`);
    continue;
  }

  errors.forEach(({ name, message }) => {
    console.log(`[${name}] ${message}`);
  });
}
