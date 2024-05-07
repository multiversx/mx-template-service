import { ConfigurationLoader, ConfigurationLoaderSettings } from "@multiversx/sdk-nestjs-common";
import { join } from "path";
import { Config } from "../entities/config";

const CONFIG_DIRECTORY = '../../../../config/';
const YAML_CONFIG_FILENAME = CONFIG_DIRECTORY + 'config.yaml';
const CONFIG_SCHEMA_FILENAME = CONFIG_DIRECTORY + 'schema.yaml';

export function configuration(): Config {
  const configPath = join(__dirname, YAML_CONFIG_FILENAME);
  const schemaPath = join(__dirname, CONFIG_SCHEMA_FILENAME);

  const settings = new ConfigurationLoaderSettings({
    configPath,
    schemaPath,
  });

  return ConfigurationLoader.getConfiguration<Config>(settings);
}
